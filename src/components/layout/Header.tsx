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
  { label: "Audits", to: "/audits" },
];

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  console.log({
    pathname,
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="mt-[24px] mb-[48px] w-full px-6">
      <div className="container">
        <nav className="flex w-full flex-col items-center justify-start gap-6 text-sm md:flex-row md:justify-center">
          <div className="flex w-full justify-between md:w-auto">
            <Link
              href={"/"}
              className="flex w-full flex-auto cursor-pointer flex-row items-center justify-around gap-2 md:w-[173px] md:justify-start"
            >
              <div className="flex-start md:flex">
                <Image
                  height={32}
                  width={32}
                  src="/logo.png"
                  alt="Sir Icon"
                  className="rounded-full"
                />
              </div>
              <h1 className="sir-shadow font-geist ml-1 inline-flex text-[20px] leading-[20px] font-semibold text-black dark:text-white">
                Sir trading
              </h1>
              <div
                className={cn("block rounded-lg md:hidden", {
                  "dark:bg-card": isMenuOpen,
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
            </Link>
          </div>
          {isMenuOpen && (
            <div className="bg-card-light dark:bg-card flex w-full flex-auto flex-col items-center justify-between gap-4 rounded-lg p-4 md:hidden">
              <div className="flex flex-col items-center gap-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.to}
                    className={cn(
                      "dark:text-grey-50 text-background dark:hover:text-white",
                      pathname === link.to && "text-black dark:text-white",
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
            <div className="flex w-full flex-row items-center gap-3">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.to}
                  className={cn(
                    "dark:text-grey-50 text-section-light/75 relative truncate p-1 text-sm hover:bg-transparent hover:text-black dark:hover:text-white",
                    pathname === link.to && "text-black dark:text-white",
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
