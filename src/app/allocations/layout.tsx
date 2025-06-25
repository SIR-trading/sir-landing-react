import React from "react";
import EvmProvider from "~/components/providers/evmProvider";
import { TRPCReactProvider } from "~/trpc/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <EvmProvider>{children}</EvmProvider>
    </TRPCReactProvider>
  );
};

export default Layout;
