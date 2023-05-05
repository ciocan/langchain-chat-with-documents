import { z } from "zod";
import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import weaviate from "weaviate-ts-client";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { env } from "~/env.mjs";

export const wvClient = weaviate.client({
  scheme: "https",
  host: env.WEAVIATE_HOST,
  apiKey: new weaviate.ApiKey(env.WEAVIATE_API_KEY),
});

const model = new ChatOpenAI({ openAIApiKey: env.OPENAI_API_KEY, modelName: "gpt-3.5-turbo" });
const embeddings = new OpenAIEmbeddings({ openAIApiKey: env.OPENAI_API_KEY });

export const chatRouter = createTRPCRouter({
  prompt: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        question: z.string(),
        history: z.array(z.object({ agent: z.string(), text: z.string() })),
      }),
    )
    .mutation(async ({ input }) => {
      const { question, userId, history } = input;

      try {
        const vectorStore = await WeaviateStore.fromExistingIndex(embeddings, {
          client: wvClient,
          indexName: "Documents",
          metadataKeys: ["userId"],
        });

        const chain = ConversationalRetrievalQAChain.fromLLM(
          model,
          vectorStore.asRetriever(undefined, {
            distance: 0,
            where: {
              path: ["userId"],
              operator: "Equal",
              valueText: userId,
            },
          }),
        );

        const chatHistory = history.map((message) => message.text);
        const res = await chain.call({ question, chat_history: chatHistory });

        const response = res.text as string;
        return response;
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
