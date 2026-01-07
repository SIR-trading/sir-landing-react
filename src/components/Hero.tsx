import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaLink?: string;
  heroImage?: string;
};

const Hero: React.FC<HeroProps> = ({
  headline,
  subheadline,
  ctaText = "Launch App",
  ctaLink = "https://app.sir.trading",
  heroImage,
}) => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Full-width hero image as background */}
      {heroImage && (
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Gentleman's Club"
            fill
            priority
            className="object-cover object-left"
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
        </div>
      )}

      {/* Warm ambient glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Fireplace-like warm glow from bottom left */}
        <div className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[120px]" />
        {/* Chandelier-like warm glow from top */}
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[100px]" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-end px-4 pb-24 pt-32">
        <div className="flex max-w-4xl flex-col items-center text-center">
          {/* Decorative gold line */}
          <div className="mb-8 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />

          {/* Headline */}
          <h1 className="mb-6 font-geist text-4xl font-bold tracking-tight text-text-primary drop-shadow-lg md:text-6xl lg:text-7xl lg:whitespace-nowrap">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg text-text-primary/90 drop-shadow-md md:text-xl">
            {subheadline}
          </p>

          {/* CTA Button - warm gold, sophisticated */}
          <Link
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border border-accent/50 bg-accent/90 px-10 py-4 text-lg font-semibold text-background shadow-[0_4px_30px_-4px_rgba(212,164,76,0.5)] backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:shadow-[0_8px_40px_-4px_rgba(212,164,76,0.6)]"
          >
            {ctaText}
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>

          {/* Decorative gold line */}
          <div className="mt-12 h-px w-48 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-accent/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
