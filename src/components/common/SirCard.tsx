// components/common/SirCard.tsx
import React from "react";
import Image from "next/image";
import { cn } from "~/lib/utils"; // Make sure this import path is correct

type SirCardProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  image?: string;
  imageAlt?: string;
  className?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const SirCard: React.FC<SirCardProps> = ({
  size = "sm",
  image,
  imageAlt = "",
  className,
  header = null,
  children,
  footer,
}) => {
  const classes = cn(
    "card flex flex-col justify-start rounded-lg",
    size === "xs" && "max-w-xs",
    size === "sm" && "max-w-sm",
    size === "md" && "max-w-md",
    size === "lg" && "max-w-lg",
    size === "xl" && "max-w-xl",
    className,
  );

  return (
    <div className={classes}>
      {image && (
          <Image
            src={image}
            className="rounded-lg w-full"
            alt={imageAlt || ""}
            width={500}
            height={300}
          />
      )}
      <div className="flex flex-col flex-wrap overflow-auto">
          <h4 className="flex flex-row items-center justify-center p-4">
            {header}
          </h4>
        <div className="flex flex-col flex-wrap">{children}</div>
      </div>
      <div>{footer}</div>
    </div>
  );
};

export default SirCard;
