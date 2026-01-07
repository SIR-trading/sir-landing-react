import Image from "next/image";
import Link from "next/link";

type PlayerCard = {
  name: string;
  image: string;
  tagline: string;
  description: string;
  learnMoreLink?: string;
};

const players: PlayerCard[] = [
  {
    name: "Gentlemen",
    image: "/gentleman_card.png",
    tagline: "Provide liquidity.",
    description: "Earn fees + SIR rewards.",
    learnMoreLink: "https://docs.sir.trading/protocol-overview/liquidity-and-leverage",
  },
  {
    name: "Traders",
    image: "/ape_card.png",
    tagline: "Take leverage.",
    description: "Pay once, hold forever.",
    learnMoreLink: "https://docs.sir.trading/protocol-overview/readme/take-on-leverage-and-forget",
  },
];

const PlayerCards: React.FC = () => {
  return (
    <section className="w-full bg-background px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="section-header-new">Choose Your Role</h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {players.map((player, index) => (
            <div
              key={player.name}
              className="group relative overflow-hidden rounded-xl border border-border bg-background-elevated transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Card background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Image container */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-elevated via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative -mt-20 p-8">
                <h3 className="mb-2 font-geist text-2xl font-bold tracking-tight text-text-primary">
                  {player.name}
                </h3>
                <p className="mb-1 text-lg font-medium text-accent">
                  {player.tagline}
                </p>
                <p className="mb-6 text-text-secondary">{player.description}</p>

                {player.learnMoreLink && (
                  <Link
                    href={player.learnMoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors duration-300 hover:text-accent"
                  >
                    Learn more
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlayerCards;
