import Link from "next/link";

type Testimonial = {
  quote: string;
  author: string;
  handle?: string;
  link?: string;
  source: "twitter" | "article";
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Trading with perfectly constant leverage, no liquidations and no funding fees on SIR is a cheat code.",
    author: "Pepbowski",
    handle: "@ruffriderx",
    link: "https://x.com/ruffriderx/status/1992698253838885345",
    source: "twitter",
  },
  {
    quote:
      "Pretty comfy in SIR I gotta say... LPing for 2 months now — made back all capital, all upfront fees and ~300% profit in $SIR, whilst surviving a ~50% drawdown thanks to reflexive leverage system.",
    author: "○",
    handle: "@0xCIRC",
    link: "https://x.com/0xCIRC/status/1986485793515315491",
    source: "twitter",
  },
  {
    quote:
      "A derivative like this doesn't exist in crypto today, and it doesn't exist in tradfi either. Such liquidation proof leveraged token would compete even with onchain margin trading protocols!",
    author: "The Crypto Analyst",
    link: "https://thecryptoanalyst.medium.com/a-new-defi-primitive-is-here-onchain-vanilla-leveraged-tokens-4b7b6b437ff9",
    source: "article",
  },
];

const TwitterIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ArticleIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
    />
  </svg>
);

const Testimonials: React.FC = () => {
  return (
    <section className="w-full bg-background-darker px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="section-header-new">What People Say</h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-xl border border-border bg-background-elevated py-6 pl-6 pr-6 transition-all duration-300 hover:border-accent/20"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Left accent bar - warm gold */}
              <span className="absolute bottom-6 left-0 top-6 w-1 rounded-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />

              {/* Quote icon */}
              <div className="mb-4 text-accent/40">
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote text */}
              <blockquote className="mb-6 flex-1 text-lg leading-relaxed text-text-primary/90">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold text-text-primary">
                    {testimonial.author}
                  </p>
                  {testimonial.handle && (
                    <p className="text-sm text-text-secondary">
                      {testimonial.handle}
                    </p>
                  )}
                </div>

                {/* Source link */}
                {testimonial.link && (
                  <Link
                    href={testimonial.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 hover:bg-accent/20"
                    aria-label={`View on ${testimonial.source === "twitter" ? "X" : "Medium"}`}
                  >
                    {testimonial.source === "twitter" ? (
                      <TwitterIcon />
                    ) : (
                      <ArticleIcon />
                    )}
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

export default Testimonials;
