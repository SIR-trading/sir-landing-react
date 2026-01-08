"use client";
import { type FC, useState } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import Image from "next/image";
import { MenuIcon, XIcon } from "lucide-react";
import NavigationTail from "~/components/layout/NavigationTail";
import { usePathname } from "next/navigation";

const links = [
  { label: "Allocations", to: "/allocations" },
  { label: "Docs", to: "https://docs.sir.trading/" },
  { label: "Audits", to: "/audits/egis" },
];

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 py-4 backdrop-blur-md bg-background/90 border-b border-accent/10">
      <div className="container mx-auto max-w-5xl">
        <nav className="flex w-full flex-col items-center justify-start gap-6 text-sm md:flex-row md:justify-center">
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link
              href={"/"}
              className="flex items-center gap-x-2"
            >
              <div className="flex gap-x-1">
                <Image
                  height={40}
                  width={40}
                  src="/SIR_outline_white.svg"
                  alt="Sir Icon"
                  className="rounded-full"
                />
                <div className="flex items-center">
                  <h1 className="ml-1 font-geist text-[20px] font-semibold leading-[20px] whitespace-nowrap">
                    Sir trading
                  </h1>
                </div>
              </div>
            </Link>
            <div
              className={cn("block rounded-lg md:hidden", {
                "bg-card": isMenuOpen,
                "bg-transparent": !isMenuOpen,
              })}
            >
              <button
                className="text-white"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="bg-card flex w-full flex-auto flex-col items-center justify-between gap-4 rounded-lg p-4 md:hidden">
              <div className="flex flex-col items-center gap-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.to}
                    className={cn(
                      "text-text-secondary hover:text-text-primary",
                      pathname.startsWith(link.to) &&
                        "text-text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <NavigationTail />
            </div>
          )}
          <div className="hidden w-full flex-row items-center justify-around gap-6 md:flex md:w-full">
            <div className="flex w-full flex-row items-center gap-3 ml-8">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.to}
                  className={cn(
                    "text-text-secondary relative truncate p-1 text-sm hover:bg-transparent hover:text-accent transition-colors duration-200",
                    pathname.startsWith(link.to) && "text-text-primary",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <NavigationTail />
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Header };
