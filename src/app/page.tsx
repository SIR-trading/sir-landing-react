import Hero from "~/components/Hero";
import ValueGrid from "~/components/ValueGrid";
import HowItWorks from "~/components/HowItWorks";
import PlayerCards from "~/components/PlayerCards";
import Testimonials from "~/components/Testimonials";
import FooterCTA from "~/components/FooterCTA";

export const metadata = {
  title: "SIR Trading | Leverage You Can Sleep On",
  description:
    "Safer leverage for long-term investors. One-time fee. No funding rates. No volatility decay.",
};

export default function Home() {
  return (
    <main className="bg-background">
      {/* Hero - Full viewport */}
      <Hero
        headline="Leverage You Can Sleep On"
        subheadline="No liquidations. A one-time fee. Convex returns."
        ctaText="Launch App"
        ctaLink="https://app.sir.trading"
        heroImage="/hero.png"
      />

      {/* Value proposition - 3 pillars */}
      <ValueGrid />

      {/* How it works - Vault diagram */}
      <HowItWorks />

      {/* Gentleman & Trader cards */}
      <PlayerCards />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer with CTA */}
      <FooterCTA />
    </main>
  );
}
