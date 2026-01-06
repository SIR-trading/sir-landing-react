"use client";
import { type FC } from "react";
import { cn } from "~/lib/utils";
import type { SourceType } from "~/types/allocations";
import { SOURCE_CONFIG } from "./SourceBadge";

interface AllocationFiltersProps {
  selectedSources: SourceType[];
  onSourceToggle: (source: SourceType) => void;
  onClearAll: () => void;
}

export const AllocationFilters: FC<AllocationFiltersProps> = ({
  selectedSources,
  onSourceToggle,
  onClearAll,
}) => {
  const sources: SourceType[] = [
    "ethereum",
    "hyperevm",
    "megaethContributor",
    "treasury",
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-end">
        {selectedSources.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-blue-500 hover:text-blue-400"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => {
          const config = SOURCE_CONFIG[source];
          const isSelected = selectedSources.includes(source);

          return (
            <button
              key={source}
              onClick={() => onSourceToggle(source)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
                isSelected
                  ? `${config.bgColor} ${config.color} border-current`
                  : "border-gray-600 text-gray-400 hover:border-gray-500",
              )}
            >
              {config.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AllocationFilters;
