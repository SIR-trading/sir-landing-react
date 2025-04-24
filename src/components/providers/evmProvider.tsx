"use client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { env } from "~/env";
import type { ReactNode } from "react";
const getChainId = () => {
  const result = env.NEXT_PUBLIC_CHAIN_ID;
  return parseInt(result);
};
const chainId = getChainId();

const chain = {
  ...(chainId == mainnet.id ? mainnet : sepolia),
  // NOTE MAYBE REMOVE THIS.
  // All rpc calls are done through trpc
  rpcUrls: { default: { http: ["/api/rpc"] } },
  id: chainId,
};

// const config = getDefaultConfig({
//   appName: "RainbowKit App",
//   projectId: "YOUR_PROJECT_ID",
//   chains: [main],
//   ssr: true,
// });

export const wagmiConfig = getDefaultConfig({
  appName: "SIR",
  projectId:
    process.env.NEXT_PUBLIC_PROJECT_ID ?? "934acc697f01fec33b75c19d9bb2e3c7",
  chains: [chain],
  ssr: true,
});

function EvmProvider({ children }: { children: ReactNode }) {
  // const initialState = cookieToInitialState(wagmiConfig, cookie);
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" theme={darkTheme({})}>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default EvmProvider;
