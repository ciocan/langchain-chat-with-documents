import { createTRPCRouter } from "~/server/api/trpc";
import { s3Router } from "./routers/s3";
import { weaviateRouter } from "./routers/weaviate";
import { chatRouter } from "./routers/chat";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  s3: s3Router,
  weaviate: weaviateRouter,
  chat: chatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
