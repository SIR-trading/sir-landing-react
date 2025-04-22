import { type FC, useState } from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";
import Image from "next/image";
import {MenuIcon, XIcon} from "lucide-react";
import NavigationTail from "~/components/layout/NavigationTail";

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: "Docs", to: "https://docs.sir.trading/" },
    { label: "Audit", to: "/audit" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="mt-[24px] mb-[48px] w-full px-6">
      <div className="container">
        <nav className="flex w-full flex-col items-center justify-start gap-6 text-sm font-semibold md:flex-row md:justify-center">
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link
              href={"/"}
              className="flex w-full flex-auto cursor-pointer flex-row items-center justify-around md:w-50 md:justify-start"
            >
              <div className=" md:flex flex-start">
                <Image height={32} width={32} src="/logo.png" alt="Sir Icon" />
              </div>
              <h1 className="sir-shadow font-lora ml-1 inline-flex h-[32px] text-[32px] leading-[32px] text-white">
                SIR.TRADING
              </h1>
              <div
                className={cn("block rounded-lg md:hidden", {
                  "bg-black-russian-950": isMenuOpen,
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
            <div className="bg-black-russian-950 flex w-full flex-auto flex-col items-center justify-between gap-4 rounded-lg p-4 md:hidden">
              <div className="flex flex-col items-center gap-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.to}
                    className="text-cameo-700 dark:text-cameo-300 hover:text-gray-900 dark:hover:text-white"
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
                  className="text-md text-cameo-700 dark:text-cameo-300 dark:hover:text-cameo-200 relative truncate p-1 hover:bg-transparent"
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
