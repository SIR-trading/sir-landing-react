"use client";
import { type FC, useState, useMemo, Fragment } from "react";
import { ChevronDown, ChevronUp, Copy, ExternalLink } from "lucide-react";
import type { AddressAllocation, SourceType } from "~/types/allocations";
import { isWeightedAllocation, isFixedAllocation } from "~/types/allocations";
import SourceBadge from "./SourceBadge";
import AllocationDetailRow from "./AllocationDetailRow";
import { cn } from "~/lib/utils";
import TooltipMain from "~/components/ui/tooltip";

interface AllocationTableProps {
  allocations: Record<string, AddressAllocation>;
  searchTerm: string;
  selectedSources: SourceType[];
  highlightAddress?: string;
}

const ITEMS_PER_PAGE = 50;

export const AllocationTable: FC<AllocationTableProps> = ({
  allocations,
  searchTerm,
  selectedSources,
  highlightAddress,
}) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedAddress, setExpandedAddress] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Filter and sort allocations
  const filteredAllocations = useMemo(() => {
    let entries = Object.entries(allocations);

    // Filter by search term
    if (searchTerm) {
      const normalized = searchTerm.toLowerCase();
      entries = entries.filter(([address]) =>
        address.toLowerCase().includes(normalized),
      );
    }

    // Filter by selected sources
    if (selectedSources.length > 0) {
      entries = entries.filter(([, allocation]) => {
        return selectedSources.some((source) => {
          if (source === "ethereum" && isWeightedAllocation(allocation)) {
            return allocation.sources.ethereum;
          }
          if (source === "hyperevm" && isWeightedAllocation(allocation)) {
            return allocation.sources.hyperevm;
          }
          if (source === "megaethContributor") {
            return isFixedAllocation(allocation);
          }
          return false;
        });
      });
    }

    // Sort by allocation percentage
    entries.sort(([, a], [, b]) => {
      const aValue = parseFloat(a.allocationPerc);
      const bValue = parseFloat(b.allocationPerc);
      return sortDirection === "desc" ? bValue - aValue : aValue - bValue;
    });

    return entries;
  }, [allocations, searchTerm, selectedSources, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAllocations.length / ITEMS_PER_PAGE);
  const paginatedAllocations = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAllocations.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAllocations, currentPage]);

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const toggleSort = () => {
    setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    setCurrentPage(1);
  };

  const getSourcesForAddress = (allocation: AddressAllocation): SourceType[] => {
    const sources: SourceType[] = [];
    if (isWeightedAllocation(allocation)) {
      if (allocation.sources.ethereum) sources.push("ethereum");
      if (allocation.sources.hyperevm) sources.push("hyperevm");
    }
    if (isFixedAllocation(allocation)) {
      sources.push("megaethContributor");
    }
    return sources;
  };

  return (
    <div className="space-y-4">
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-section-light dark:text-section">
          Showing {paginatedAllocations.length} of{" "}
          {filteredAllocations.length.toLocaleString()} addresses
        </p>
        <button
          onClick={toggleSort}
          className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400"
        >
          Sort by allocation{" "}
          {sortDirection === "desc" ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left text-xs font-semibold text-section-light dark:text-section">
                Address
              </th>
              <th className="p-3 text-right text-xs font-semibold text-section-light dark:text-section">
                Allocation %
              </th>
              <th className="p-3 text-right text-xs font-semibold text-section-light dark:text-section">
                Type
              </th>
              <th className="p-3 text-left text-xs font-semibold text-section-light dark:text-section">
                Sources
              </th>
              <th className="p-3 text-center text-xs font-semibold text-section-light dark:text-section">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedAllocations.map(([address, allocation]) => {
              const isExpanded = expandedAddress === address;
              const isHighlighted =
                highlightAddress?.toLowerCase() === address.toLowerCase();
              const sources = getSourcesForAddress(allocation);

              return (
                <Fragment key={address}>
                  <tr
                    className={cn(
                      "border-b border-gray-800 transition-colors hover:bg-background-light/50 dark:hover:bg-white/5",
                      isHighlighted && "bg-blue-500/10",
                    )}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-black dark:text-white">
                          {address.slice(0, 6)}...{address.slice(-4)}
                        </span>
                        <TooltipMain
                          trigger={
                            <span
                              onClick={() => handleCopyAddress(address)}
                              className="text-gray-400 hover:text-gray-300 cursor-pointer"
                            >
                              <Copy className="h-3 w-3" />
                            </span>
                          }
                          content={
                            copiedAddress === address ? "Copied!" : "Copy address"
                          }
                        />
                        <TooltipMain
                          trigger={
                            <a
                              href={`https://megaexplorer.xyz/address/${address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-300"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          }
                          content="View on MegaETH Explorer"
                        />
                      </div>
                    </td>
                    <td className="p-3 text-right font-mono text-sm font-semibold text-black dark:text-white">
                      {allocation.allocationPerc}
                    </td>
                    <td className="p-3 text-right font-mono text-sm text-black dark:text-white">
                      {allocation.type}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {sources.map((source) => (
                          <SourceBadge key={source} type={source} />
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          setExpandedAddress(isExpanded ? null : address)
                        }
                        className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                      >
                        {isExpanded ? "Hide" : "Show"}
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan={5} className="p-0">
                        <div className="p-4 bg-background-light/30 dark:bg-black/30">
                          <AllocationDetailRow
                            allocation={allocation}
                            address={address}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg bg-background-light dark:bg-white/5 px-4 py-2 text-sm font-medium text-black dark:text-white disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-section-light dark:text-section">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg bg-background-light dark:bg-white/5 px-4 py-2 text-sm font-medium text-black dark:text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {filteredAllocations.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-section-light dark:text-section">
            No allocations found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllocationTable;
