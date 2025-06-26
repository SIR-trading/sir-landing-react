// components/common/Section.tsx
import React from "react";
import { cn } from "~/lib/utils";

type SectionProps = {
  className?: string;
  variant?: "ring" | "background" | "background-p0" | "none";
  header?: React.ReactNode;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({
  className,
  variant = "none",
  header,
  children,
}) => {
  const classes = cn(
    "rounded-lg",
    {
      "ring-2 ring-gray-800": variant === "ring",
      "bg-card-light dark:bg-card shadow-section":
        variant === "background" || variant === "background-p0",
      "p-3 md:py-10 md:px-16 my-12": variant !== "background-p0",
      "p-3 md:px-0 md:py-8 my-12": variant === "background-p0",
    },
    className,
  );

  return (
    <section className={classes}>
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        {header && (
          <h1 className="section-header mb-[24px] text-xl">{header}</h1>
        )}
        <div className={"section-main"}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
