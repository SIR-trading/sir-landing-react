// import Image from "next/image";
import Link from "next/link";
import Section from "~/components/common/Section";
import SirHero from "~/components/common/SirHero";
// import SirCard from "~/components/common/SirCard";
import EthSirChart from "~/components/EthSirChart";
import Team from "~/components/Team";
// import Contributions from "~/components/sale/Contributions";
import { TRPCReactProvider } from "~/trpc/react";
import EvmProvider from "~/components/providers/evmProvider";

export const metadata = {
  title: "SIR Trading",
  description: "Leverage with a one-time fee, keep the rest for yourself",
};

export default function Home() {
  return (
    <>
      <TRPCReactProvider>
        <EvmProvider>
          <div className="container">
            <SirHero image="hero_image_borderless.png">
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

            <Section
              className="mb-0"
              variant="background"
              header="What is SIR?"
            >
              <div className="flex w-full flex-col items-center justify-center gap-6">
                <div className="section-text-block">
                  <p>
                    SIR brings a fresh approach to leveraged investing in DeFi,
                    offering compounding returns without the usual drawbacks.
                    Unlike traditional approaches to leverage, SIR does away
                    with maintenance fees and removes{" "}
                    <Link
                      href="https://www.etf.com/sections/etf-basics/why-do-leveraged-etfs-decay"
                      className="underline"
                    >
                      volatility decay
                    </Link>
                    .
                  </p>
                  <p>
                    Users pay a fixed amount when they open or close a position
                    , in contrast with many platforms that charge ongoing fees,
                    eating into long-term returns.
                  </p>
                </div>
                <div className="flex w-full flex-col items-center justify-center">
                  <EthSirChart />
                  <p className="w-full text-xs italic">
                    Example of simulated ETH/USDC position in SIR with perfect
                    constant x1.5 leverage versus
                    <Link
                      href="https://www.opyn.co/squeeth?ct=IT"
                      className="underline"
                    >
                      {" "}
                      Squeeth from Opyn
                    </Link>
                  </p>
                </div>
                <div className="section-text-block">
                  <p>
                    SIR achieves these improvements by controlling its own
                    internal liquidity pools. This enables continuous virtual
                    rebalancing, ensuring steady leverage without costly
                    external transactions.
                  </p>
                  <p>
                    The result is a safer, more efficient way to gain amplified,
                    compounding returns over the long term.
                  </p>
                </div>
              </div>
            </Section>

            {/*<Section variant="background" header={"SIR: a Fee Paying Token"}>*/}
            {/*  <div className="section-text-block flex flex-col items-center md:flex-row">*/}
            {/*    <Image*/}
            {/*      src="/pile_of_coins.png"*/}
            {/*      alt="pile of coins"*/}
            {/*      width={300}*/}
            {/*      height={300}*/}
            {/*      className="mx-auto h-full w-full max-w-xs object-cover md:mr-4 md:w-1/4"*/}
            {/*    />*/}
            {/*    <div className="section-text-block">*/}
            {/*      <p>*/}
            {/*        SIR is the native token of the SIR protocol. Unlike most*/}
            {/*        DeFi tokens, the SIR token issuance is immutable and part of*/}
            {/*        the core protocol. The SIR token is designed to have strong*/}
            {/*        fundamentals,*/}
            {/*        <span className="text-red-accent font-semibold">*/}
            {/*          {" "}*/}
            {/*          rewarding its stakers with a share of the protocol&#39;s*/}
            {/*          generated fees*/}
            {/*        </span>*/}
            {/*        .*/}
            {/*      </p>*/}
            {/*      <p>*/}
            {/*        The token is primarily{" "}*/}
            {/*        <span className="text-red-accent font-semibold">*/}
            {/*          distributed to liquidity providers*/}
            {/*        </span>{" "}*/}
            {/*        at a rate of 2,015 million tokens per year, in perpetuity.*/}
            {/*        To maintain a proportional stake in the protocol, providing*/}
            {/*        liquidity is necessary.*/}
            {/*      </p>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</Section>*/}

            <Section variant="background" header={"Permissionless & Trustless"}>
              <div className="section-text-block">
                <p>
                  SIR is designed as a DeFi primitive, focusing on being
                  maximally trustless and permissionless. Like Uniswap, anyone
                  can create a vault , specifying a pair of tokens and a
                  leverage ratio.
                </p>

                <p>
                  The protocol runs on immutable smart contracts with fixed
                  parameters, eliminating risks from unexpected changes. After
                  its beta phase, SIR&#39;s unstoppable code will be completely
                  immutable, living on Ethereum forever .
                </p>
                <p>
                  This trustless architecture, combined with reliable price
                  oracles, establishes SIR as a fundamental &#39;money lego&#39;
                  in the DeFi ecosystem.
                </p>
              </div>
            </Section>

            {/*<Section variant="background-p0" header={"Gentlemen & Apes"}>*/}
            {/*  <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-evenly lg:gap-0">*/}
            {/*    <SirCard image="/gentlemen_card.jpg" size="md">*/}
            {/*      <p>*/}
            {/*        Gentlemen{" "}*/}
            {/*        <span className="text-red-accent font-semibold">*/}
            {/*          provide liquidity to the protocol*/}
            {/*        </span>*/}
            {/*        . They earn fees for doing so, and on selected vaults, also*/}
            {/*        rewards in the native token SIR. Their LP positions are*/}
            {/*        tokenized in the form of an ERC-1155 called TEA.*/}
            {/*      </p>*/}
            {/*    </SirCard>*/}
            {/*    <SirCard image="/ape_card.jpg" size="md">*/}
            {/*      <p>*/}
            {/*        Apes{" "}*/}
            {/*        <span className="text-red-accent font-semibold">*/}
            {/*          choose which pair they want to long, and what leverage*/}
            {/*        </span>*/}
            {/*        . They pay upfront fees for minting and burning, but not*/}
            {/*        while holding their positions. APE is a leveraged ERC-20*/}
            {/*        token that can be transferred and used in other protocols.*/}
            {/*      </p>*/}
            {/*    </SirCard>*/}
            {/*  </div>*/}
            {/*</Section>*/}

            <Section variant="background" header={"Team"}>
              <Team />
            </Section>
          </div>
        </EvmProvider>
      </TRPCReactProvider>
    </>
  );
}
