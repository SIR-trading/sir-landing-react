import Image from "next/image";
import Link from "next/link";
import Section from "~/components/common/Section";
import SirHero from "~/components/common/SirHero";
import SirCard from "~/components/common/SirCard";
import EthSirChart from "~/components/EthSirChart";
import Team from "~/components/Team";
// import Contributions from "~/components/sale/Contributions";
// import { TRPCReactProvider } from "~/trpc/react";
// import EvmProvider from "~/components/providers/evmProvider";

export const metadata = {
  title: "SIR Trading",
  description: "Leverage with a one-time fee, keep the rest for yourself",
};

export default function Home() {
  return (
    <>
      <div className="container">
        <SirHero image="VaultDiagram">
          Safer leverage for
          <br />
          Long-term investors
        </SirHero>

        {/*<Section*/}
        {/*  className="relative mb-0"*/}
        {/*  variant="background"*/}
        {/*  header={"Allocation"}*/}
        {/*>*/}
        {/*  <Contributions />*/}
        {/*</Section>*/}

        <Section className="mb-0" variant="background" header="What is SIR?">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="section-text-block">
              <p>
                SIR offers a new way to take leverage in DeFi: <strong>compounding exposure without the usual drag</strong>.
                Instead of funding or maintenance fees that slowly eat returns, <strong>SIR charges one fixed fee only when you open a position</strong>.
              </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              <EthSirChart />
              <p className="w-full text-[10px] italic">
                <span className="text-black/75 dark:text-white/75">
                  Example of simulated ETH/USDC position in SIR with perfect
                  constant x1.5 leverage versus
                </span>
                <Link
                  href="https://www.opyn.co/squeeth?ct=IT"
                  className="underline opacity-75"
                >
                  {" "}
                  Squeeth from Opyn
                </Link>
              </p>
            </div>
            <div className="section-text-block">
              <p>
                The protocol maintains <strong>its own internal liquidity pools</strong>,
                letting it update balances on-chain without the constant rebalancing trades that cause <Link
                  href="https://www.etf.com/sections/etf-basics/why-do-leveraged-etfs-decay"
                  className="underline"
                >
                  volatility decay
                </Link> elsewhere. 
              </p>
              <p>
                As prices move, <strong>leverage stays mechanically constant</strong>,
                so positions follow their target payoff without bleeding value to fees or decay.
                The result is a <strong>safer, more efficient path to amplified, long-term returns</strong>.
              </p>
            </div>
          </div>
        </Section>

        {/* header={"SIR: a Fee Paying Token"} */}
        <Section variant="background">
          <div className="section-text-block flex flex-col items-center md:flex-row">
            <div className="section-text-block">
              <h1 className="section-header mb-8 text-xl text-center">
                SIR: a Fee Paying Token
              </h1>

              <p>
                SIR is the native token of the SIR protocol. Unlike most DeFi
                tokens, the SIR token issuance is immutable and part of the core
                protocol. The SIR token is designed
                to have strong fundamentals, <strong>rewarding its stakers</strong> with
                a share of the protocol&#39;s <strong>generated fees</strong>.
              </p>
              <p>
                The token is primarily{" "}
                <strong>distributed to liquidity provider</strong> at a rate of
                2,015 million tokens per year, in perpetuity. To maintain a
                proportional stake in the protocol, providing liquidity is
                necessary.
              </p>
            </div>
            <Image
              src="/pile_of_coins.png"
              alt="pile of coins"
              width={300}
              height={300}
              className="mx-auto h-full w-full max-w-xs object-cover md:w-1/4"
            />
          </div>
        </Section>

        <Section variant="background" header={"Permissionless & Trustless"}>
          {/* <div className="section-text-block"> */}
          <ol className="space-y-6 text-left">
            <li className="flex items-center gap-4">
              <span className="relative grid place-items-center w-15 h-15 shrink-0">
                <span aria-hidden className="neon-badge absolute inset-0" />
                <span className="absolute inset-0 flex items-center justify-center font-semibold">1</span>
              </span>

              <p className="leading-relaxed">
                SIR is designed as a DeFi primitive, focusing on being maximally
                trustless and permissionless.{" "}
                Like Uniswap, <strong>anyone can create a vault</strong>,
                specifying a pair of tokens and a leverage ratio.
              </p>
            </li>

            <li className="flex items-center gap-4">
              <span className="relative grid place-items-center w-15 h-15 shrink-0">
                <span aria-hidden className="neon-badge absolute inset-0" />
                <span className="absolute inset-0 flex items-center justify-center font-semibold">2</span>
              </span>

              <p className="leading-relaxed">
                The protocol runs on immutable smart contracts with fixed
                parameters, eliminating risks from unexpected changes. After its
                beta phase, SIR&#39;s unstoppable code will be{" "}
                <strong>completely immutable</strong>, living on Ethereum forever.
              </p>
            </li>

            <li className="flex items-center gap-4">
              <span className="relative grid place-items-center w-15 h-15 shrink-0">
                <span aria-hidden className="neon-badge absolute inset-0" />
                <span className="absolute inset-0 flex items-center justify-center font-semibold">3</span>
              </span>

              <p className="leading-relaxed">
                This trustless architecture, combined with reliable price oracles,
                establishes SIR as a <strong>fundamental <em>money lego</em></strong> in the DeFi
                ecosystem.
              </p>
            </li>
          </ol>
          {/* </div> */}
        </Section>

        <Section variant="background" header={"Gentlemen & Apes"}>
          <div className="section-text-block w-full flex-1">
            <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
              <SirCard image="/gentleman_card.png" size="md">
                <p>
                  Gentlemen <strong>provide liquidity to the protocol</strong>.
                  They earn fees for doing so, and on selected vaults, also
                  rewards in the native token SIR. Their LP positions are
                  tokenized in the form of an ERC-1155 called TEA.
                </p>
              </SirCard>
              <SirCard image="/ape_card.png" size="md">
                <p>
                  Apes{" "}
                  <strong>
                    choose which pair they want to long, and what leverage
                  </strong>
                  . They pay upfront fees for minting and burning, but not while
                  holding their positions. APE is a leveraged ERC-20 token that
                  can be transferred and used in other protocols.
                </p>
              </SirCard>
            </div>
          </div>
        </Section>

        <Section variant="background" header={"Team"}>
          <Team />
        </Section>
      </div>
    </>
  );
}
