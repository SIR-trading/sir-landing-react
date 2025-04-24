import "server-only";
// Don't let client use viem client
// Make all rpc calls on backend

import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { env } from "~/env";
import { sepolia } from "wagmi/chains";
const getChainId = () => {
  const result: string = env.NEXT_PUBLIC_CHAIN_ID ?? "1";
  return parseInt(result);
};
const chainId = getChainId();

const chain = {
  ...(chainId == mainnet.id ? mainnet : sepolia),
  // NOTE MAYBE REMOVE THIS.
  // All rpc calls are done through trpc
  // rpcUrls: { default: { http: ["/api/rpc"] } },
  id: chainId,
};
const viemClient = createPublicClient({
  chain: chain,
  transport: http(env.RPC_URL ?? "https://rpc.ankr.com/eth"),
});
export const readContract = viemClient.readContract;
export const simulateContract = viemClient.simulateContract;
export const multicall = viemClient.multicall;
export const getBalance = viemClient.getBalance;
export const getBlock = viemClient.getBlock;
export const rpcViemClient = {
  simulateContract: viemClient.simulateContract,
  readContract: viemClient.readContract,
  multicall: viemClient.multicall,
  getBalance: viemClient.getBalance,
  getBlock: viemClient.getBlock,
};
