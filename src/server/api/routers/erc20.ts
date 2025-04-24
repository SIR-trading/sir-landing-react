import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { erc20Abi } from "viem";
import { readContract } from "~/utils/viemClient";

export const erc20Router = createTRPCRouter({
  getBalance: publicProcedure
    .input(
      z.object({
        token: z.string().startsWith("0x"),
        address: z.string().startsWith("0x").length(42),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await readContract({
          address: input.token as `0x${string}`,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [input.address as `0x${string}`],
        });
      } catch (error) {
        console.error("Error fetching erc20 token balance:", error);
        throw new Error("Failed to fetch token balance");
      }
    }),

  getAllowance: publicProcedure
    .input(
      z.object({
        token: z.string().startsWith("0x"),
        owner: z.string().startsWith("0x").length(42),
        spender: z.string().startsWith("0x").length(42),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await readContract({
          address: input.token as `0x${string}`,
          abi: erc20Abi,
          functionName: "allowance",
          args: [input.owner as `0x${string}`, input.spender as `0x${string}`],
        });
      } catch (error) {
        console.error("Error fetching erc20 allowance:", error);
        throw new Error("Failed to fetch token allowance");
      }
    }),
});
