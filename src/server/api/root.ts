import { erc20Router } from "~/server/api/routers/erc20";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { presaleRouter } from "~/server/api/routers/presale";
import { nftsRouter } from "~/server/api/routers/nftsRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  presale: presaleRouter,
  erc20: erc20Router,
  nfts: nftsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.user.all();
 *       ^? user[]
 */
export const createCaller = createCallerFactory(appRouter);
