import type {Address} from "viem";


export enum EContracts {
    "PRESALE"
}

export const contractAddresses = {
    [EContracts.PRESALE]: process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS as Address,
} as const;