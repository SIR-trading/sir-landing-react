import type { ReadContractReturnType } from "viem";
import type { PresaleContract } from "~/contracts/presale";

export enum Stablecoin {
  USDT,
  USDC,
  DAI,
}

export type TContribution = ReadContractReturnType<
  typeof PresaleContract.abi,
  "contributions",
  readonly [`0x${string}`]
>;
export type TPresaleState = ReadContractReturnType<
  typeof PresaleContract.abi,
  "state"
>;

export type TToken = {
  name: string;
  ticker: string;
  address: `0x${string}`;
  icon: string;
  decimals: number;
};
