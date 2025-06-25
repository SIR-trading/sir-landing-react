import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

import { readContract, multicall } from "~/utils/viemClient";
import { env } from "~/env";
import { erc721Abi, getAddress, zeroAddress } from "viem";

const zAddress = z.string().length(42).startsWith("0x").optional();

const fetchNFTs = async (contract: `0x${string}`, user: `0x${string}`) => {
  console.log("contract", contract);
  const amount = await readContract({
    address: contract,
    abi: erc721Abi,
    functionName: "balanceOf",
    args: [user],
  });

  const res = await multicall({
    contracts: Array.from({ length: Number(amount) }, (_, i) => ({
      address: contract,
      abi: erc721Abi,
      functionName: "tokenOfOwnerByIndex",
      args: [user, BigInt(i)],
    })),
  });

  return res.map((r) => Number(r.result));
};

export const nftsRouter = createTRPCRouter({
  fetchWalletButerinCards: publicProcedure
    .input(zAddress)
    .query(async ({ input }) => {
      return await fetchNFTs(
        getAddress(env.NEXT_PUBLIC_BUTERIN_CARDS),
        getAddress(input ?? zeroAddress),
      );
    }),
  fetchWalletMinedJpeg: publicProcedure
    .input(zAddress)
    .query(async ({ input }) => {
      return await fetchNFTs(
        getAddress(env.NEXT_PUBLIC_MINED_JPEG),
        getAddress(input ?? zeroAddress),
      );
    }),
});
