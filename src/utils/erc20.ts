import type { TToken } from "~/lib/types/data";
import TOKEN_LIST, { boostedAddresses } from "~/lib/token_list";

export const getTokenInfo = (ticker: string): TToken | null =>
  TOKEN_LIST.find((token) => token.ticker === ticker) ?? null;

export const isBoostedAddress = (address: `0x${string}` | undefined): boolean =>
  !!boostedAddresses.find(
    (add) => add.toLocaleLowerCase() === address?.toLowerCase(),
  );
