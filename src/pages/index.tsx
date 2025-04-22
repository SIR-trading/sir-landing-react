import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// import { api } from "~/utils/api";
import Section from "~/components/common/Section";
import SirHero from "~/components/common/SirHero";
import SirCard from "~/components/common/SirCard";
// import SirProgressBar from "~/components/common/SirProgressBar"; // TODO: For Sales
import SirButton from "~/components/common/SirButton";
import EthSirChart from "~/components/EthSirChart";
import Team from "~/components/Team";

export default function Home() {
  return (
    <>
      <Head>
        <title>SIR Trading</title>
        <meta name="description" content="Leverage with a one-time fee, keep the rest for yourself" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <SirHero image="hero_image_borderless.png">
          Leverage with a one-time fee,<br/>keep the rest for yourself
        </SirHero>

        <Section className="mb-0" variant="background" header={"SIR Token Presale"}>

          <div className="flex flex-col section-text-block mt-0 mb-6">
            <p>
              <span className="font-semibold text-red-accent">The sale is over.</span> Check your contribution here.
            </p>
          </div>
          {/*<SirProgressBar />*/}
          <div className="mt-6 flex flex-row w-full justify-center md:justify-end">
            <Link href="/sale">
              <SirButton label="Check contribution" />
            </Link>
          </div>
        </Section>

        <Section className="mb-0" variant="background" header="What is Synthetics Implemented Right (SIR)?">
          <div className="flex flex-col gap-6 w-full items-center justify-center">
            <div className="section-text-block">
              <p>
                SIR brings a fresh approach to leveraged investing in DeFi,
                offering compounding returns without the usual drawbacks.
                Unlike traditional approaches to leverage,
                <span className="font-semibold text-red-accent">
                  {" "}SIR does away with maintenance fees and removes{" "}
                  <Link href="https://www.etf.com/sections/etf-basics/why-do-leveraged-etfs-decay" className="underline">
                    volatility decay
                  </Link>
                </span>.
              </p>
              <p>
                Users
                <span className="font-semibold text-red-accent"> pay a fixed amount when they open or close a position</span>,
                in contrast with many platforms that charge ongoing fees, eating into long-term returns.
              </p>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
              <EthSirChart />
              <p className="text-xs italic mt-2">
                Example of simulated ETH/USDC position in SIR with perfect constant x1.5 leverage versus
                <Link href="https://www.opyn.co/squeeth?ct=IT" className="underline"> Squeeth from Opyn</Link>
              </p>
            </div>
            <div className="section-text-block">
              <p>
                SIR achieves these improvements by controlling its own internal liquidity pools. This enables continuous
                virtual rebalancing, ensuring steady leverage without costly external transactions.
              </p>
              <p>
                The result is
                <span className="font-semibold text-red-accent"> a safer, more efficient way to gain amplified,
                compounding returns</span> over the long term.
              </p>
            </div>
          </div>
        </Section>

        <Section variant="background" header={"SIR: a Fee Paying Token"}>
          <div className="section-text-block flex flex-col md:flex-row items-center">
            <Image
              src="/pile_of_coins.png"
              alt="pile of coins"
              width={300}
              height={300}
              className="h-full object-cover md:w-1/4 md:mr-4 w-full max-w-xs mx-auto"
            />
            <div className="section-text-block">
              <p>
                SIR is the native token of the SIR protocol. Unlike most DeFi tokens,
                the SIR token issuance is immutable and part of the core protocol.
                The SIR token is designed to have strong fundamentals,
                <span className="font-semibold text-red-accent"> rewarding its stakers with a share of the protocol&#39;s generated fees</span>.
              </p>
              <p>
                The token is primarily <span className="font-semibold text-red-accent">distributed to liquidity providers</span> at a rate of 2,015 million tokens per year,
                in perpetuity. To maintain a proportional stake in the protocol,
                providing liquidity is necessary.
              </p>
            </div>
          </div>
        </Section>

        <Section variant="background" header={"Permissionless & Trustless"}>
          <div className="section-text-block">
            <div className="flex flex-col md:flex-row gap-3 w-full items-center justify-center md:justify-start">
              <div className="bullet-point w-8 h-8 md:flex-shrink-0 text-sm">1</div>
              <p>SIR is designed as a DeFi primitive, focusing on being maximally trustless and permissionless.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full items-center justify-center md:justify-start">
              <div className="bullet-point w-8 h-8 md:flex-shrink-0 text-sm">2</div>
              <p>
                Like Uniswap,
                <span className="font-semibold text-red-accent"> anyone can create a vault</span>,
                specifying a pair of tokens and a leverage ratio.
                The protocol runs on immutable smart contracts
                with fixed parameters, eliminating risks from unexpected changes.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full items-center justify-center md:justify-start">
              <div className="bullet-point w-8 h-8 md:flex-shrink-0 text-sm">3</div>
              <p>
                After its beta phase, SIR&#39;s unstoppable code will be
                <span className="font-semibold text-red-accent"> completely immutable, living on Ethereum forever</span>.
              </p>
            </div>
            <p>
              This trustless architecture, combined with reliable price oracles, establishes SIR as a fundamental &#39;money
              lego&#39; in the DeFi ecosystem.
            </p>
          </div>
        </Section>

        <Section variant="background-p0" header={"Gentlemen & Apes"}>
          <div className="flex flex-col gap-12 lg:gap-0 lg:flex-row items-center lg:items-start lg:justify-evenly w-full">
            <SirCard image="/gentlemen_card.jpg" size="md">
              <p>
                Gentlemen <span className="font-semibold text-red-accent">
                provide liquidity to the protocol</span>. They earn fees for doing so, and on selected vaults, also rewards in the native token SIR.
                Their LP positions are tokenized in the form of an ERC-1155 called TEA.
              </p>
            </SirCard>
            <SirCard image="/ape_card.jpg" size="md">
              <p>
                Apes <span className="font-semibold text-red-accent">choose which pair they want to long, and what leverage</span>.
                They pay upfront fees for minting and burning, but not while holding their positions.
                APE is a leveraged ERC-20 token that can be transferred and used in other protocols.
              </p>
            </SirCard>
          </div>
        </Section>

        <Section variant="background" header={"Team"}>
          <Team />
        </Section>
      </div>
    </>
  );
}