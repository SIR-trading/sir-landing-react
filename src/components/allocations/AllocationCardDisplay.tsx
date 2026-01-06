"use client";
import { type FC } from "react";
import type {
  AddressAllocation,
  AllocationMetadata,
  SourceBreakdown,
} from "~/types/allocations";
import { isFixedAllocation, isWeightedAllocation } from "~/types/allocations";

interface AllocationCardDisplayProps {
  allocation: AddressAllocation;
  address: string;
  metadata?: AllocationMetadata;
}

/**
 * Format percentage value to display nicely
 */
const formatPercentageValue = (percentage: string | number): string => {
  const num = typeof percentage === "string" ? parseFloat(percentage) : percentage;
  if (num === 0) return "0%";

  if (num >= 10) {
    return num.toFixed(1) + "%";
  } else if (num >= 1) {
    return num.toFixed(2) + "%";
  } else {
    return num.toFixed(3) + "%";
  }
};

/**
 * Format number to 3 significant digits with metric suffixes (k, M, B, T)
 */
const formatSig3 = (num: number, suffix: string = ""): string => {
  if (num === 0) return "0" + suffix;

  const abs = Math.abs(num);
  let formatted: string;

  if (abs >= 100) {
    formatted = Math.round(num).toString();
  } else if (abs >= 10) {
    formatted = num.toFixed(1);
  } else if (abs >= 1) {
    formatted = num.toFixed(2);
  } else {
    formatted = num.toPrecision(3);
  }

  // Clean trailing zeros after decimal
  formatted = formatted.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");

  return formatted + suffix;
};

/**
 * Format SIR token amounts with metric suffixes (k, M, B, T)
 * Input is in smallest unit, divide by 10^12 to get actual SIR amount (SIR has 12 decimals)
 */
const formatSIRAmount = (value: string | number | undefined): string => {
  if (!value) return "0";

  const num = Number(value) / 1e12;
  if (num === 0) return "0";

  const abs = Math.abs(num);

  if (abs >= 1e12) return formatSig3(num / 1e12, "T");
  if (abs >= 1e9) return formatSig3(num / 1e9, "B");
  if (abs >= 1e6) return formatSig3(num / 1e6, "M");
  if (abs >= 1e3) return formatSig3(num / 1e3, "k");

  return formatSig3(num);
};


interface BreakdownItem {
  label: string;
  value: string;
}

const getBreakdownItems = (breakdown: SourceBreakdown | undefined): BreakdownItem[] => {
  if (!breakdown) return [];

  const items: BreakdownItem[] = [];

  if (breakdown.sirBalance && Number(breakdown.sirBalance) > 0) {
    items.push({ label: "Wallet Balance", value: formatSIRAmount(breakdown.sirBalance) });
  }

  if (breakdown.stakedSIR) {
    if (breakdown.stakedSIR.unlockedStake && Number(breakdown.stakedSIR.unlockedStake) > 0) {
      items.push({ label: "Unlocked Stake", value: formatSIRAmount(breakdown.stakedSIR.unlockedStake) });
    }
    if (breakdown.stakedSIR.lockedStake && Number(breakdown.stakedSIR.lockedStake) > 0) {
      items.push({ label: "Locked Stake", value: formatSIRAmount(breakdown.stakedSIR.lockedStake) });
    }
  }

  if (breakdown.vaultEquity) {
    for (const [vaultId, vault] of Object.entries(breakdown.vaultEquity)) {
      if (vault.teaEquitySIR && Number(vault.teaEquitySIR) > 0) {
        items.push({ label: `Vault ${vaultId} TEA`, value: formatSIRAmount(vault.teaEquitySIR) });
      }
      if (vault.apeEquitySIR && Number(vault.apeEquitySIR) > 0) {
        items.push({ label: `Vault ${vaultId} APE`, value: formatSIRAmount(vault.apeEquitySIR) });
      }
    }
  }

  if (breakdown.unclaimedLperRewards && Number(breakdown.unclaimedLperRewards) > 0) {
    items.push({ label: "Unclaimed LP Rewards", value: formatSIRAmount(breakdown.unclaimedLperRewards) });
  }

  if (breakdown.unclaimedContributorRewards && Number(breakdown.unclaimedContributorRewards) > 0) {
    items.push({ label: "Unclaimed Contributor Rewards", value: formatSIRAmount(breakdown.unclaimedContributorRewards) });
  }
  if (breakdown.unissuedContributorRewards && Number(breakdown.unissuedContributorRewards) > 0) {
    items.push({ label: "Unissued Contributor Rewards", value: formatSIRAmount(breakdown.unissuedContributorRewards) });
  }

  if (breakdown.uniswapV3Equity && Number(breakdown.uniswapV3Equity) > 0) {
    items.push({ label: "Uniswap V3 LP", value: formatSIRAmount(breakdown.uniswapV3Equity) });
  }
  if (breakdown.uniswapV3UnclaimedFees && Number(breakdown.uniswapV3UnclaimedFees) > 0) {
    items.push({ label: "Uniswap V3 Unclaimed Fees", value: formatSIRAmount(breakdown.uniswapV3UnclaimedFees) });
  }
  if (breakdown.uniswapV3StakingRewards && Number(breakdown.uniswapV3StakingRewards) > 0) {
    items.push({ label: "Uniswap V3 Staking Rewards", value: formatSIRAmount(breakdown.uniswapV3StakingRewards) });
  }

  return items;
};

export const AllocationCardDisplay: FC<AllocationCardDisplayProps> = ({
  allocation,
  address: _address,
  metadata: _metadata,
}) => {
  if (isFixedAllocation(allocation)) {
    const annualIssuance = 2015000000; // 2015M MegaSIR per year
    const percValue = parseFloat(allocation.allocationPerc.replace('%', ''));
    const annualTokens = (percValue / 100) * annualIssuance;

    return (
      <div className="animated-height text-sm w-full space-y-1">
        <div className="rounded-lg p-2 bg-[#CC9901]/30">
          <div className="grid grid-cols-[2fr_1fr] gap-2">
            <div className="text-left font-semibold">Total Allocation</div>
            <div className="text-right font-mono font-semibold">{allocation.allocationPerc}</div>
          </div>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-2 px-2 py-1 text-gray-400">
          <div className="text-left">Annual MegaSIR</div>
          <div className="text-right font-mono">{formatSIRAmount(annualTokens * 1e12)}</div>
        </div>
      </div>
    );
  }

  if (isWeightedAllocation(allocation)) {
    const TVL_SIR = 66000;
    const TVL_HYPERSIR = 10000;
    const TOTAL_TVL = TVL_SIR + TVL_HYPERSIR;
    const annualIssuance = 2015000000; // 2015M MegaSIR per year

    const ethPercentage = parseFloat(allocation.percentageBreakdown.ethereumPercentage) || 0;
    const hyperPercentage = parseFloat(allocation.percentageBreakdown.hyperEVMPercentage) || 0;
    const percValue = parseFloat(allocation.allocationPerc.replace('%', ''));
    const annualTokens = (percValue / 100) * annualIssuance;

    const ethContribution = (ethPercentage * TVL_SIR) / TOTAL_TVL;
    const hyperContribution = (hyperPercentage * TVL_HYPERSIR) / TOTAL_TVL;

    const ethBreakdown = allocation.sources.ethereum
      ? getBreakdownItems(allocation.sources.ethereum.breakdown)
      : [];
    const hyperBreakdown = allocation.sources.hyperevm
      ? getBreakdownItems(allocation.sources.hyperevm.breakdown)
      : [];

    return (
      <div className="animated-height text-sm w-full space-y-1">
        {/* SIR Section */}
        {allocation.sources.ethereum && (
          <>
            <div className="rounded-lg p-2 bg-[#3B82F6]/40">
              <div className="grid grid-cols-[2fr_1fr] gap-2">
                <div className="text-left font-medium text-[#93C5FD]">Total SIR on Ethereum</div>
                <div className="text-right font-mono font-medium text-[#93C5FD]">
                  {formatSIRAmount(allocation.sources.ethereum.totalSIR)}
                </div>
              </div>
            </div>
            {ethBreakdown.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[2fr_1fr] gap-2 text-xs px-3 py-1 text-gray-400">
                <div className="text-left">{item.label}</div>
                <div className="text-right font-mono">{item.value}</div>
              </div>
            ))}
            <div className="rounded-lg p-2 bg-[#3B82F6]/40">
              <div className="grid grid-cols-[2fr_1fr] gap-2">
                <div className="text-left text-[#93C5FD]">% of Ethereum Holder Pool</div>
                <div className="text-right font-mono text-[#93C5FD]">{formatSig3(ethPercentage)}%</div>
              </div>
            </div>
          </>
        )}

        {/* Spacer between sections */}
        {allocation.sources.ethereum && allocation.sources.hyperevm && (
          <div className="h-2" />
        )}

        {/* HyperSIR Section */}
        {allocation.sources.hyperevm && (
          <>
            <div className="rounded-lg p-2 bg-[#9333EA]/40">
              <div className="grid grid-cols-[2fr_1fr] gap-2">
                <div className="text-left font-medium text-[#D8B4FE]">Total HyperSIR on HyperEVM</div>
                <div className="text-right font-mono font-medium text-[#D8B4FE]">
                  {formatSIRAmount(allocation.sources.hyperevm.totalSIR)}
                </div>
              </div>
            </div>
            {hyperBreakdown.map((item, idx) => (
              <div key={idx} className="grid grid-cols-[2fr_1fr] gap-2 text-xs px-3 py-1 text-gray-400">
                <div className="text-left">{item.label}</div>
                <div className="text-right font-mono">{item.value}</div>
              </div>
            ))}
            <div className="rounded-lg p-2 bg-[#9333EA]/40">
              <div className="grid grid-cols-[2fr_1fr] gap-2">
                <div className="text-left text-[#D8B4FE]">% of HyperEVM Holder Pool</div>
                <div className="text-right font-mono text-[#D8B4FE]">{formatSig3(hyperPercentage)}%</div>
              </div>
            </div>
          </>
        )}

        {/* Spacer before results */}
        <div className="h-2" />

        {/* Final Calculation */}
        <div className="rounded-lg p-2 bg-gray-500/20">
          <div className="grid grid-cols-[2fr_1fr] gap-2">
            <div className="text-left text-gray-300">
              Weighted Average
              <span className="text-xs text-gray-500 ml-1">(87% SIR, 13% HyperSIR)</span>
            </div>
            <div className="text-right font-mono text-gray-300">
              {formatSig3(parseFloat(allocation.percentageBreakdown.weightedPercentage))}%
            </div>
          </div>
        </div>
        <div className="rounded-lg p-2 bg-[#CC9901]/30">
          <div className="grid grid-cols-[2fr_1fr] gap-2">
            <div className="text-left font-semibold">
              Total Allocation
              <span className="text-xs font-normal text-gray-500 ml-1">(of 15% MegaSIR for holders)</span>
            </div>
            <div className="text-right font-mono font-semibold">{allocation.allocationPerc}</div>
          </div>
        </div>
        <div className="grid grid-cols-[2fr_1fr] gap-2 px-2 py-1 text-gray-400">
          <div className="text-left">Annual MegaSIR</div>
          <div className="text-right font-mono">{formatSIRAmount(annualTokens * 1e12)}</div>
        </div>
      </div>
    );
  }

  return null;
};

export default AllocationCardDisplay;
