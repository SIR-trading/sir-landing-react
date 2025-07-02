import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "~/styles/globals.css";
import { Header } from "~/components/layout/Header";
import type { ReactNode } from "react";
import Script from "next/script";
import AOSInitializer from "~/components/AOSInitializer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata = {
  title: "SIR Trading",
  description:
    "SIR is a DeFi protocol designed to address the key challenges of leveraged trading, such as volatility decay and liquidation risks, making it safer for long-term investing.",
};

async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="theme-toggle"
          src="/theme.js"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`relative ${GeistSans.variable} ${inter.className} bg-background-light dark:bg-background text-black dark:text-white`}
      >
        <div className="gradient-bg absolute top-0 left-0 z-[-1] h-full w-full opacity-100"></div>
        <div className="font-inter flex min-h-screen flex-col">
          <Header />
          <main className="content h-80">{children}</main>
        </div>{" "}
        <AOSInitializer />
      </body>
    </html>
  );
}

export default RootLayout;
