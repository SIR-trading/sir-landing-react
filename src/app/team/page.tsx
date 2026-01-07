import Link from "next/link";
import Team from "~/components/Team";

export const metadata = {
  title: "Team | SIR Trading",
  description: "Meet the team behind SIR Trading",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        {/* Back link */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        {/* Page header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-geist text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
            Our Team
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Meet the people building the future of leveraged DeFi
          </p>
        </div>

        {/* Team grid */}
        <Team />
      </div>
    </div>
  );
}
