import React from "react";
import EvmProvider from "~/components/providers/evmProvider";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "MegaSIR Allocations | SIR Trading",
  description: "Check your MegaSIR token allocation for the MegaETH chain.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <EvmProvider>{children}</EvmProvider>
    </TRPCReactProvider>
  );
};

export default Layout;
