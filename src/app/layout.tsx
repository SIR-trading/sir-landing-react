import { Inter, Bebas_Neue } from "next/font/google";
import "~/styles/globals.css";
import { Header } from "~/components/layout/Header";
import Bg from "../../public/background.png";
import EvmProvider from "~/components/providers/evmProvider";
import type { ReactNode } from "react";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const lora = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lora",
});

async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundRepeat: "repeat",
        }}
        className={`relative ${lora.variable} ${inter.className} text-white`}
      >
        <div
          style={{
            background:
              "radial-gradient(55.25% 55.16% at 48.63% 44.84%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%)",
            backgroundBlendMode: "lighten",
            boxShadow: "0px 4px 0px 0px rgba(0,0,0,0.5)",
          }}
          className="absolute top-0 left-0 z-[-1] h-full w-full opacity-100"
        ></div>
        <TRPCReactProvider>
          <EvmProvider>
            <div className="font-inter flex min-h-screen flex-col">
              <Header />
              <main className="content h-80">{children}</main>
            </div>{" "}
          </EvmProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

export default RootLayout;
