"use client";
import { type FC } from "react";
import type { AddressAllocation, AllocationMetadata } from "~/types/allocations";

interface AllocationCardDisplayProps {
  allocation: AddressAllocation;
  address: string;
  showZeroValues?: boolean;
  totalSIRRaw?: string;
  metadata?: AllocationMetadata;
}

// Labels that should be highlighted with darker background
const HIGHLIGHT_LABELS = [
  "Total Allocation",
];

// Calculation summary rows should use purple color
const isCalculationRow = (label: string): boolean => {
  return label.startsWith("From ");
};

/**
 * Format SIR token amounts with metric suffixes (k, M, B, T)
 * Divides by 10^12 to get actual SIR amount, then formats to 3 significant figures
 */
const formatSIRAmount = (value: string | number | undefined): string => {
  if (!value) return "0 SIR";

  // Convert to number and divide by 10^12 to get actual SIR amount
  const num = Number(value) / 1e12;

  if (num === 0) return "0 SIR";

  const abs = Math.abs(num);

  // Determine suffix and divisor
  let divisor = 1;
  let suffix = "";

  if (abs >= 1e12) {
    // Trillions and above - stack trillions (e.g., 14,600T)
    divisor = 1e12;
    suffix = "T";
  } else if (abs >= 1e9) {
    divisor = 1e9;
    suffix = "B";
  } else if (abs >= 1e6) {
    divisor = 1e6;
    suffix = "M";
  } else if (abs >= 1e3) {
    divisor = 1e3;
    suffix = "k";
  }

  const scaled = num / divisor;

  // Format with appropriate precision for 3 significant figures
  let formatted: string;
  if (Math.abs(scaled) >= 100) {
    // 100-999 range: show no decimals (e.g., 123k)
    formatted = Math.round(scaled).toLocaleString();
  } else if (Math.abs(scaled) >= 10) {
    // 10-99 range: show 1 decimal (e.g., 12.3k)
    formatted = scaled.toFixed(1);
  } else {
    // 1-9 range: show 2 decimals (e.g., 1.23k)
    formatted = scaled.toFixed(2);
  }

  // Remove trailing zeros after decimal point
  formatted = formatted.replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');

  return formatted + suffix + " SIR";
};

/**
 * Format percentage value to exactly 3 significant figures
 */
const formatPercentageValue = (percentage: number): string => {
  if (percentage === 0) return "0%";

  // Use toPrecision(3) to get exactly 3 significant figures
  const abs = Math.abs(percentage);
  let formatted = abs.toPrecision(3);

  // toPrecision can return scientific notation for very small numbers
  // Convert back to decimal notation if needed
  const num = parseFloat(formatted);

  // Determine appropriate decimal places to display the number properly
  if (num >= 100) {
    formatted = num.toFixed(0);
  } else if (num >= 10) {
    formatted = num.toFixed(1);
  } else if (num >= 1) {
    formatted = num.toFixed(2);
  } else {
    // For numbers less than 1, we need to preserve the significant figures
    // Count leading zeros after decimal point
    const str = num.toString();
    if (str.includes('e')) {
      // Handle scientific notation
      formatted = num.toFixed(20); // Large number to get all decimals
    } else {
      formatted = str;
    }
  }

  // Remove trailing zeros after decimal point
  formatted = formatted.replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');

  return (percentage < 0 ? '-' : '') + formatted + "%";
};

export const AllocationCardDisplay: FC<AllocationCardDisplayProps> = ({
  allocation,
  address: _address,
  showZeroValues = false,
  totalSIRRaw,
  metadata,
}) => {
  const balanceRows: Array<{ label: string; value: string }> = [];
  const uniswapRows: Array<{ label: string; value: string }> = [];
  const rewardRows: Array<{ label: string; value: string }> = [];
  const otherRows: Array<{ label: string; value: string }> = [];
  const calculationRows: Array<{ label: string; value: string }> = [];

  // Note: allocationBreakdown values are uint56 proportions, not SIR amounts
  // We don't display them as they're internal proportion values

  // Add detailed Ethereum source breakdown if available
  if (allocation.sources.ethereum) {
    const eth = allocation.sources.ethereum;

    if (showZeroValues || (eth.sirBalance && Number(eth.sirBalance) / 1e12 >= 0.001)) {
      balanceRows.push({
        label: "SIR Balance",
        value: formatSIRAmount(eth.sirBalance),
      });
    }

    if (eth.stakedSIR) {
      if (showZeroValues || eth.stakedSIR.unlockedStake) {
        balanceRows.push({
          label: "Staked SIR (Unlocked)",
          value: formatSIRAmount(eth.stakedSIR.unlockedStake),
        });
      }
      if (showZeroValues || eth.stakedSIR.lockedStake) {
        balanceRows.push({
          label: "Staked SIR (Locked)",
          value: formatSIRAmount(eth.stakedSIR.lockedStake),
        });
      }
    }

    if (eth.vaultEquity) {
      Object.entries(eth.vaultEquity).forEach(([vaultId, vaultData]) => {
        const totalEquity = Number(vaultData.teaEquitySIR) + Number(vaultData.apeEquitySIR);
        if (showZeroValues || totalEquity > 0) {
          balanceRows.push({
            label: `SIR in Vault ${vaultId}`,
            value: formatSIRAmount(totalEquity),
          });
        }
      });
    }

    if (showZeroValues || eth.unclaimedLperRewards) {
      balanceRows.push({
        label: "Unclaimed LP Rewards",
        value: formatSIRAmount(eth.unclaimedLperRewards),
      });
    }

    if (showZeroValues || eth.uniswapV3Equity) {
      uniswapRows.push({
        label: "Uniswap V3 Equity",
        value: formatSIRAmount(eth.uniswapV3Equity),
      });
    }

    if (showZeroValues || eth.uniswapV3StakingRewards) {
      uniswapRows.push({
        label: "Uniswap V3 Staking Rewards",
        value: formatSIRAmount(eth.uniswapV3StakingRewards),
      });
    }

    if (showZeroValues || eth.uniswapV3UnclaimedFees) {
      uniswapRows.push({
        label: "Uniswap V3 Unclaimed Fees",
        value: formatSIRAmount(eth.uniswapV3UnclaimedFees),
      });
    }

    if (showZeroValues || eth.unclaimedContributorRewards) {
      rewardRows.push({
        label: "Unclaimed Contributor Rewards",
        value: formatSIRAmount(eth.unclaimedContributorRewards),
      });
    }

    if (showZeroValues || eth.unissuedContributorRewards) {
      rewardRows.push({
        label: "Unissued Contributor Rewards",
        value: formatSIRAmount(eth.unissuedContributorRewards),
      });
    }
  }

  // Add Hypurr NFT data if available
  if (allocation.sources.hypurr) {
    otherRows.push({
      label: "Hypurr NFT Count",
      value: String(allocation.sources.hypurr.nftCount),
    });
  }

  // Add HyperEVM Contributor data if available
  if (allocation.sources.hyperevmContributor) {
    otherRows.push({
      label: "HyperEVM Contributor Basis Points",
      value: String(allocation.sources.hyperevmContributor.basisPoints),
    });
  }

  // Calculate allocation breakdown using metadata
  if (metadata && totalSIRRaw) {
    // From Ethereum SIR holdings
    if (allocation.sources.ethereum?.totalSIR) {
      const userSIR = Number(allocation.sources.ethereum.totalSIR);
      const totalSIR = Number(totalSIRRaw);
      const sirHoldersPerc = parseFloat(metadata.allocationDistribution.sirHolders.replace('%', ''));
      const contribution = (userSIR / totalSIR) * sirHoldersPerc;

      calculationRows.push({
        label: `From Ethereum (${formatSIRAmount(userSIR)} / ${formatSIRAmount(totalSIR)} × ${metadata.allocationDistribution.sirHolders})`,
        value: formatPercentageValue(contribution),
      });
    }

    // From Hypurr NFTs
    if (allocation.sources.hypurr?.nftCount) {
      const userNFTs = allocation.sources.hypurr.nftCount;
      const totalNFTs = metadata.totalNFTs;
      const hypurrPerc = parseFloat(metadata.allocationDistribution.hypurrHolders.replace('%', ''));
      const contribution = (userNFTs / totalNFTs) * hypurrPerc;

      calculationRows.push({
        label: `From Hypurr (${userNFTs} / ${totalNFTs} × ${metadata.allocationDistribution.hypurrHolders})`,
        value: formatPercentageValue(contribution),
      });
    }

    // From HyperEVM Contributors
    if (allocation.sources.hyperevmContributor?.basisPoints) {
      const basisPoints = allocation.sources.hyperevmContributor.basisPoints;
      const contribution = basisPoints / 100; // basis points to percentage

      calculationRows.push({
        label: `From HyperEVM Contributor (${basisPoints} bp)`,
        value: formatPercentageValue(contribution),
      });
    }
  }

  const renderRow = (row: { label: string; value: string }, index: number) => {
    const isHighlight = HIGHLIGHT_LABELS.includes(row.label);
    const isCalculation = isCalculationRow(row.label);

    let bgColor = "bg-[#CC6677]/30"; // Default pink for normal rows
    if (isHighlight) {
      bgColor = "bg-[#CC9901]/30"; // Gold for Total Allocation
    } else if (isCalculation) {
      bgColor = "bg-[#6A3C99]/30"; // Purple for calculation summary rows
    }

    return (
      <div
        key={`${row.label}-${index}`}
        className={`rounded-lg p-2 ${bgColor}`}
      >
        <div className="grid grid-cols-[2fr_1fr] gap-2">
          <div className="text-left">{row.label}</div>
          <div className="text-right">{row.value}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="animated-height text-sm w-full space-y-4">
      {/* Balance Section */}
      {balanceRows.length > 0 && (
        <div className="space-y-1">
          {balanceRows.map((row, index) => renderRow(row, index))}
        </div>
      )}

      {/* Uniswap V3 Section */}
      {uniswapRows.length > 0 && (
        <div className="space-y-1">
          {uniswapRows.map((row, index) => renderRow(row, index))}
        </div>
      )}

      {/* Rewards Section */}
      {rewardRows.length > 0 && (
        <div className="space-y-1">
          {rewardRows.map((row, index) => renderRow(row, index))}
        </div>
      )}

      {/* Other Sources Section */}
      {otherRows.length > 0 && (
        <div className="space-y-1">
          {otherRows.map((row, index) => renderRow(row, index))}
        </div>
      )}

      {/* Calculation Breakdown Section */}
      {calculationRows.length > 0 && (
        <div className="space-y-1">
          {calculationRows.map((row, index) => renderRow(row, index))}
        </div>
      )}

      {/* Total Allocation - At Bottom */}
      <div className="pt-2">
        {renderRow(
          {
            label: "Total Allocation",
            value: (() => {
              // Calculate daily SIR emissions: allocation% * 2015M / 100 / 365
              const percentValue = parseFloat(allocation.allocationPerc.replace('%', ''));
              const dailyEmission = percentValue * 2015e6 / 100 / 365;
              const dailyFormatted = formatSIRAmount((dailyEmission * 1e12).toString());
              return `${allocation.allocationPerc} (${dailyFormatted}/day)`;
            })(),
          },
          999
        )}
      </div>
    </div>
  );
};

export default AllocationCardDisplay;
