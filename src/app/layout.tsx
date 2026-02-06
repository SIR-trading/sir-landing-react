import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "~/styles/globals.css";
import { Header } from "~/components/layout/Header";
import type { ReactNode } from "react";
import AOSInitializer from "~/components/AOSInitializer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});


export const metadata = {
  title: "SIR Trading",
  metadataBase: new URL('https://sir.trading'),
  description:
    "SIR is a DeFi protocol designed to address the key challenges of leveraged trading, such as volatility decay and liquidation risks, making it safer for long-term investing.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "SIR - Pay once, keep the upside.",
    description: "SIR is a DeFi protocol designed to address the key challenges of leveraged trading, such as volatility decay and liquidation risks, making it safer for long-term investing.",
    images: [
      {
        url: "https://app.sir.trading/social-media-preview.png", // Use absolute URL
        width: 1200,
        height: 630,
        alt: "SIR - Pay once, keep the upside.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIR - Pay once, keep the upside.",
    description: "SIR is a DeFi protocol designed to address the key challenges of leveraged trading, such as volatility decay and liquidation risks, making it safer for long-term investing.",
    images: ["https://app.sir.trading/social-media-preview.png"],
    creator: "@leveragesir",
  },
};

async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head />
      <body
        className={`relative ${GeistSans.variable} ${inter.className} bg-background text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SIR",
              url: "https://sir.trading",
              description: "DeFi protocol for leveraged trading without liquidation risk",
              sameAs: ["https://x.com/leveragesir"],
            }),
          }}
        />
        <div className="font-inter flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-[72px]">{children}</main>
        </div>
        <AOSInitializer />
      </body>
    </html>
  );
}

export default RootLayout;
