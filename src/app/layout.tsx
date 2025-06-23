import { Inter, Bebas_Neue } from "next/font/google";
import "~/styles/globals.css";
import { Header } from "~/components/layout/Header";
import type { ReactNode } from "react";

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
        className={`relative ${lora.variable} ${inter.className} bg-background text-white`}
      >
        <div
          style={{
            background:
              "radial-gradient(53.42% 53.42% at 50% 50%, rgba(132, 42, 255, 0.2) 0%, rgba(70, 26, 136, 0.2) 36.14%, rgba(10, 11, 22, 0.2) 100%)",
          }}
          className="absolute top-0 left-0 z-[-1] h-full w-full opacity-100"
        ></div>
        <div className="font-inter flex min-h-screen flex-col">
          <Header />
          <main className="content h-80">{children}</main>
        </div>{" "}
      </body>
    </html>
  );
}

export default RootLayout;
