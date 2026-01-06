import { type FC } from "react";
import { cn } from "~/lib/utils";
import type { SourceType } from "~/types/allocations";

interface SourceBadgeProps {
  type: SourceType;
  className?: string;
}

const SOURCE_CONFIG: Record<
  SourceType,
  { label: string; color: string; bgColor: string }
> = {
  ethereum: {
    label: "Ethereum",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20 border-blue-500/40",
  },
  hyperevm: {
    label: "HyperEVM",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20 border-purple-500/40",
  },
  megaethContributor: {
    label: "MegaETH",
    color: "text-green-400",
    bgColor: "bg-green-500/20 border-green-500/40",
  },
  treasury: {
    label: "Treasury",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20 border-yellow-500/40",
  },
};

export const SourceBadge: FC<SourceBadgeProps> = ({ type, className }) => {
  const config = SOURCE_CONFIG[type];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        config.bgColor,
        config.color,
        className,
      )}
    >
      {config.label}
    </span>
  );
};

export default SourceBadge;
export { SOURCE_CONFIG };
