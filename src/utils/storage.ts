import type { GetObjectOutput } from "@aws-sdk/client-s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Document } from "langchain/document";

import { S3 } from "~/server/api/routers/s3";

export async function getObject(Bucket: string, Key: string): Promise<GetObjectOutput> {
  const getObjectCommand = new GetObjectCommand({
    Bucket,
    Key,
  });

  const response = await S3.send(getObjectCommand);
  return response;
}

export async function streamToBlob(stream: ReadableStream, contentType: string): Promise<Blob> {
  const response = new Response(stream);
  const blob = await response.blob();
  return new Blob([blob], { type: contentType });
}

export async function getObjectAsBlob(
  Bucket: string,
  Key: string,
): Promise<{ blob: Blob; contentType: string }> {
  const objectResponse = await getObject(Bucket, Key);
  const contentType = objectResponse.ContentType || "";
  const stream = objectResponse.Body as ReadableStream;
  const blob = await streamToBlob(stream, contentType);
  return { blob, contentType };
}

export function transformDoc(doc: Document, { userId, name }: { userId: string; name: string }) {
  return new Document({
    pageContent: doc.pageContent,
    metadata: {
      userId,
      name,
      // loc: doc.metadata.loc as string, //TODO: objects are not supported, needs to be flattened
    },
  });
}
