import type { TToken } from "~/lib/types/data";

const TOKEN_LIST: TToken[] = [
  {
    name: "USDT",
    ticker: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    icon: "/token/usdt.png",
    decimals: 6,
  },
  {
    name: "USDC",
    ticker: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    icon: "/token/usdc.svg",
    decimals: 6,
  },
  {
    name: "DAI",
    ticker: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    icon: "/token/dai.svg",
    decimals: 18,
  },
];

export const boostedAddresses = [
  "0x36D11126eBc59cb962AE8ddD3bcD0741b4e337Dc",
  "0xF032eF6D2Bc2dBAF66371cFEC4B1B49F4786A250",
  "0x2513bf7540334eeF1733849c50FD41D598a46103",
  "0xa485b739e99334f4b92b04da2122e2923a054688",
  "0x478087E12DB15302a364C64CDB79F14Ae6C5C9b7",
  "0x7B3E8cbA240827590F63249Bc6314713317a665b",
  "0x349DC3AcFb99ddACd3D00F1AEFC297eE8108Cb44",
  "0xB10B38a69DA178aa2d249315CbB28F031E9fb71B",
];

export default TOKEN_LIST;
