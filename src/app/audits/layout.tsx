"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
const links = [
  {
    label: "Custodia Security",
    to: "/audits/custodia",
  },
  {
    label: "Egis Security",
    to: "/audits/egis",
  },
  {
    label: "Syzygy",
    to: "/audits/syzygy",
  },
  {
    label: "Guild Audits",
    to: "/audits/guild",
  },
  {
    label: "Egis Security (pre-exploit)",
    to: "/audits/pre-exploit",
  },
];

function AuditLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-card-light dark:bg-card container flex h-[calc(90vh-36px)] min-h-[500px] w-full flex-col items-center gap-8 rounded-lg p-5">
      <div className="flex items-center justify-center gap-4">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.to}
            className={cn(
              "dark:text-grey-50 text-background/70 text-sm hover:text-black dark:hover:text-white",
              pathname === link.to &&
                "text-black underline underline-offset-16 dark:text-white",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}

export default AuditLayout;
