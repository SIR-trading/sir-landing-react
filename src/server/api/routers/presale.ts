import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { readContract } from "~/utils/viemClient";
import { PresaleContract } from "~/contracts/presale";

export const presaleRouter = createTRPCRouter({
  getUserContribution: publicProcedure
    .input(z.string().startsWith("0x").length(42))
    .query(async ({ input }) => {
      const result = await readContract({
        ...PresaleContract,
        functionName: "contributions",
        args: [input as `0x${string}`],
      });

      return result;
    }),
});
