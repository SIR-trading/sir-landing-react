import Link from "next/link";
import Image from "next/image";
import { FaXTwitter, FaDiscord, FaGithub } from "react-icons/fa6";

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/leveragesir",
    icon: FaXTwitter,
  },
  {
    name: "Discord",
    href: "https://discord.gg/sirtrade",
    icon: FaDiscord,
  },
  {
    name: "GitHub",
    href: "https://github.com/SIR-trading",
    icon: FaGithub,
  },
];

const footerLinks = [
  { name: "Docs", href: "https://docs.sir.trading" },
  { name: "Audits", href: "/audits" },
  { name: "Team", href: "/team" },
];

const FooterCTA: React.FC = () => {
  return (
    <section className="w-full bg-background px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* CTA Section */}
        <div
          className="mb-20 flex flex-col items-center text-center"
          data-aos="fade-up"
        >
          <h2 className="section-header-new mb-6">
            Ready to leverage smarter?
          </h2>

          {/* Warm gold CTA button */}
          <Link
            href="https://app.sir.trading"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border border-accent/50 bg-accent px-10 py-4 text-lg font-semibold text-background shadow-[0_4px_30px_-4px_rgba(212,164,76,0.4)] transition-all duration-300 hover:border-accent hover:shadow-[0_8px_40px_-4px_rgba(212,164,76,0.5)]"
          >
            Launch App
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
        </div>

        {/* Decorative divider */}
        <div className="mx-auto mb-12 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Footer */}
        <footer className="pt-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            {/* Logo - matching header */}
            <Link href="/" className="flex items-center gap-x-2">
              <Image
                height={32}
                width={32}
                src="/SIR_outline_white.svg"
                alt="Sir Icon"
                className="rounded-full"
              />
              <span className="font-geist text-lg font-semibold text-text-primary">
                Sir trading
              </span>
            </Link>

            {/* Links */}
            <nav className="flex items-center gap-8">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors duration-300 hover:text-accent"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background-elevated text-text-secondary transition-all duration-300 hover:bg-accent/10 hover:text-accent"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-sm text-text-muted">
            <p>&copy; {new Date().getFullYear()} SIR Trading. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FooterCTA;
