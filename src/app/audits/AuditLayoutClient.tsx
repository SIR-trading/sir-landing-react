"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

const auditGroups = [
  {
    title: "MegaETH Launch",
    description: "Security audits for the MegaETH deployment",
    audits: [
      {
        label: "Egis Security (MegaETH)",
        slug: "egis-megaeth",
        description: "Security audit for MegaETH launch",
      },
    ],
  },
  {
    title: "Ethereum Relaunch",
    description: "Security audits for the Ethereum relaunch after the exploit",
    audits: [
      {
        label: "Custodia Security",
        slug: "custodia",
        description: "Comprehensive smart contract audit",
      },
      {
        label: "Egis Security",
        slug: "egis",
        description: "Security review and vulnerability assessment",
      },
      {
        label: "Syzygy",
        slug: "syzygy",
        description: "Independent security analysis",
      },
      {
        label: "Guild Audits",
        slug: "guild",
        description: "Protocol security verification",
      },
    ],
  },
  {
    title: "Pre-Exploit",
    description: "Original audit for SIR on Ethereum (before the exploit)",
    audits: [
      {
        label: "Egis Security (Pre-Exploit)",
        slug: "pre-exploit",
        description: "Historical security audit",
      },
    ],
  },
];

function AuditLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuditPage = pathname !== "/audits";

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="w-full bg-background-darker px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent" />
          <h1 className="mb-4 font-geist text-4xl font-bold text-text-primary md:text-5xl">
            Security Audits
          </h1>
          <p className="text-lg text-text-secondary">
            Independent security reviews of our smart contracts
          </p>
        </div>
      </section>

      {/* Navigation */}
      <section className="w-full border-b border-border bg-background px-4">
        <div className="mx-auto max-w-5xl">
          <nav className="flex items-center gap-1 overflow-x-auto py-4 scrollbar-hide">
            {auditGroups.map((group, groupIndex) => (
              <div key={group.title} className="flex items-center gap-1">
                {groupIndex > 0 && (
                  <div className="mx-2 h-4 w-px bg-border" />
                )}
                {group.audits.map((audit) => (
                  <Link
                    key={audit.slug}
                    href={`/audits/${audit.slug}`}
                    className={cn(
                      "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300",
                      pathname === `/audits/${audit.slug}`
                        ? "bg-accent/10 text-accent"
                        : "text-text-secondary hover:bg-background-elevated hover:text-text-primary"
                    )}
                  >
                    {audit.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="w-full bg-background px-4 py-8">
        <div className="mx-auto max-w-5xl">
          {isAuditPage ? (
            <div className="rounded-xl border border-border bg-background-elevated overflow-hidden">
              {children}
            </div>
          ) : (
            /* Audit Cards Grid for main /audits page */
            <div className="space-y-10">
              {auditGroups.map((group, groupIndex) => (
                <div key={group.title}>
                  {groupIndex > 0 && (
                    <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                  )}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-text-primary">{group.title}</h2>
                    <p className="text-sm text-text-secondary mt-1">{group.description}</p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {group.audits.map((audit) => (
                      <Link
                        key={audit.slug}
                        href={`/audits/${audit.slug}`}
                        className="group rounded-xl border border-border bg-background-elevated p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_8px_30px_-8px_rgba(212,164,76,0.15)]"
                      >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/20">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="mb-2 font-semibold text-text-primary group-hover:text-accent transition-colors">
                          {audit.label}
                        </h3>
                        <p className="text-sm text-text-secondary">{audit.description}</p>
                        <div className="mt-4 flex items-center gap-1 text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
                          View Report
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer Note */}
      <section className="w-full bg-background-darker px-4 py-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm text-text-muted">
            All audits are conducted by independent third-party security firms.
            For questions about our security practices, please{" "}
            <a
              href="https://discord.gg/sirtrade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              contact us on Discord
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

export default AuditLayoutClient;
