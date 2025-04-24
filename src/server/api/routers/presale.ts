import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { readContract } from "~/utils/viemClient";
import { PresaleContract } from "~/contracts/presale";
import type { TContribution, TPresaleState } from "~/lib/types/data";

export const presaleRouter = createTRPCRouter({
  getUserContribution: publicProcedure
    .input(z.string().startsWith("0x").length(42).optional())
    .query(async ({ input }) => {
      const result: TContribution = await readContract({
        ...PresaleContract,
        functionName: "contributions",
        args: [input as `0x${string}`],
      });

      return result;
    }),

  getState: publicProcedure.query(async (): Promise<TPresaleState> => {
    return await readContract({
      ...PresaleContract,
      functionName: "state",
    });
  }),
});
