import { z } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  HeadBucketCommand,
  CreateBucketCommand,
  PutBucketCorsCommand,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { sleep } from "~/utils";
import { wvClient } from "./weaviate";

export const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_SECRET_KEY,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

export const s3Router = createTRPCRouter({
  createPresignUrl: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      console.info("createPresignUrl", input);
      const { name, userId } = input;
      const Bucket = `bellingcat-${userId}`;
      const Key = name;

      try {
        await S3.send(new HeadBucketCommand({ Bucket }));
      } catch (e) {
        await S3.send(new CreateBucketCommand({ Bucket }));
        await S3.send(
          new PutBucketCorsCommand({
            Bucket,
            CORSConfiguration: {
              CORSRules: [
                {
                  AllowedHeaders: ["*"],
                  AllowedMethods: ["PUT"],
                  AllowedOrigins: ["*"],
                  MaxAgeSeconds: 300,
                },
              ],
            },
          }),
        );
        await sleep(500); // allow cors to propagate
      }
      const url = await getSignedUrl(S3, new PutObjectCommand({ Bucket, Key }), { expiresIn: 300 });
      return { url };
    }),
  deleteFile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      console.info("deleteFile");
      const { name, userId } = input;
      const Bucket = `bellingcat-${userId}`;
      const Key = name;
      await S3.send(new DeleteObjectCommand({ Bucket, Key }));
      //delete from weaviate
      await wvClient.batch
        .objectsBatchDeleter()
        .withClassName("Documents")
        .withWhere({
          path: ["userId"],
          operator: "Equal",
          valueText: userId,
        })
        .withWhere({
          path: ["name"],
          operator: "Equal",
          valueText: name,
        })
        .do();
      return { name };
    }),
});
