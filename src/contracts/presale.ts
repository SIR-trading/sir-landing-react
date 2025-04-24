import { contractAddresses, EContracts } from "~/lib/contractAddresses";

export const PresaleContract = {
  address: contractAddresses[EContracts.PRESALE],
  abi: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    { inputs: [], name: "NftsLocked", type: "error" },
    { inputs: [], name: "NoNfts", type: "error" },
    { inputs: [], name: "NullDeposit", type: "error" },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    { inputs: [], name: "SaleIsLive", type: "error" },
    { inputs: [], name: "SaleIsOver", type: "error" },
    { inputs: [], name: "TooManyNfts", type: "error" },
    { inputs: [], name: "WrongStablecoin", type: "error" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "tokenId",
          type: "uint16",
        },
      ],
      name: "ButerinCardLocked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "tokenId",
          type: "uint16",
        },
      ],
      name: "ButerinCardUnlocked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "enum SaleStructs.Stablecoin",
          name: "stablecoin",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint24",
          name: "amountNoDecimals",
          type: "uint24",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    { anonymous: false, inputs: [], name: "DepositWasReduced", type: "event" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint8",
          name: "tokenId",
          type: "uint8",
        },
      ],
      name: "MinedJpegLocked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint8",
          name: "tokenId",
          type: "uint8",
        },
      ],
      name: "MinedJpegUnlocked",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint40",
          name: "timeSaleEnded",
          type: "uint40",
        },
      ],
      name: "SaleEnded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "enum SaleStructs.Stablecoin",
          name: "stablecoin",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint24",
          name: "amountNoDecimals",
          type: "uint24",
        },
      ],
      name: "Withdrawal",
      type: "event",
    },
    {
      inputs: [],
      name: "MAX_CONTRIBUTIONS_NO_DECIMALS",
      outputs: [{ internalType: "uint24", name: "", type: "uint24" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "contributor", type: "address" },
      ],
      name: "contributions",
      outputs: [
        {
          components: [
            {
              internalType: "enum SaleStructs.Stablecoin",
              name: "stablecoin",
              type: "uint8",
            },
            {
              internalType: "uint24",
              name: "amountFinalNoDecimals",
              type: "uint24",
            },
            {
              internalType: "uint24",
              name: "amountWithdrawableNoDecimals",
              type: "uint24",
            },
            {
              internalType: "uint40",
              name: "timeLastContribution",
              type: "uint40",
            },
            {
              components: [
                { internalType: "uint8", name: "number", type: "uint8" },
                { internalType: "uint16[5]", name: "ids", type: "uint16[5]" },
              ],
              internalType: "struct SaleStructs.LockedButerinCards",
              name: "lockedButerinCards",
              type: "tuple",
            },
            {
              components: [
                { internalType: "uint8", name: "number", type: "uint8" },
                { internalType: "uint8[5]", name: "ids", type: "uint8[5]" },
              ],
              internalType: "struct SaleStructs.LockedMinedJpegs",
              name: "lockedMinedJpegs",
              type: "tuple",
            },
          ],
          internalType: "struct SaleStructs.Contribution",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum SaleStructs.Stablecoin",
          name: "stablecoin",
          type: "uint8",
        },
        { internalType: "uint24", name: "amountNoDecimals", type: "uint24" },
        { internalType: "uint16[]", name: "buterinCardIds", type: "uint16[]" },
        { internalType: "uint8[]", name: "minedJpegIds", type: "uint8[]" },
      ],
      name: "depositAndLockNfts",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "endSale",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint16[]", name: "buterinCardIds", type: "uint16[]" },
        { internalType: "uint8[]", name: "minedJpegIds", type: "uint8[]" },
      ],
      name: "lockNfts",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "state",
      outputs: [
        {
          components: [
            {
              internalType: "uint24",
              name: "totalContributionsNoDecimals",
              type: "uint24",
            },
            { internalType: "uint40", name: "timeSaleEnded", type: "uint40" },
          ],
          internalType: "struct SaleStructs.SaleState",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unlockAllNfts",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "withdrawExoticERC20",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawNfts",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
} as const;
