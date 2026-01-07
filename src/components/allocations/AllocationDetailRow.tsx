"use client";
import { type FC } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
} from "chart.js";
import type { AddressAllocation, SourceBreakdown } from "~/types/allocations";
import { isWeightedAllocation, isFixedAllocation } from "~/types/allocations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface AllocationDetailRowProps {
  allocation: AddressAllocation;
  address: string;
}

const formatSIRAmount = (value: string | number | undefined): string => {
  if (!value) return "0";
  const num = Number(value) / 1e12; // SIR has 12 decimals
  if (num === 0) return "0";

  const abs = Math.abs(num);
  let divisor = 1;
  let suffix = "";

  if (abs >= 1e6) {
    divisor = 1e6;
    suffix = "M";
  } else if (abs >= 1e3) {
    divisor = 1e3;
    suffix = "k";
  }

  const scaled = num / divisor;
  let formatted = scaled.toFixed(2);
  formatted = formatted.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");

  return formatted + suffix;
};

interface BreakdownItem {
  label: string;
  value: string;
}

const getBreakdownItems = (breakdown: SourceBreakdown | undefined): BreakdownItem[] => {
  if (!breakdown) return [];

  const items: BreakdownItem[] = [];

  // Wallet Balance
  if (breakdown.sirBalance && Number(breakdown.sirBalance) > 0) {
    items.push({ label: "Wallet Balance", value: formatSIRAmount(breakdown.sirBalance) });
  }

  // Staked SIR
  if (breakdown.stakedSIR) {
    if (breakdown.stakedSIR.unlockedStake && Number(breakdown.stakedSIR.unlockedStake) > 0) {
      items.push({ label: "Unlocked Stake", value: formatSIRAmount(breakdown.stakedSIR.unlockedStake) });
    }
    if (breakdown.stakedSIR.lockedStake && Number(breakdown.stakedSIR.lockedStake) > 0) {
      items.push({ label: "Locked Stake", value: formatSIRAmount(breakdown.stakedSIR.lockedStake) });
    }
  }

  // Vault Equity
  if (breakdown.vaultEquity) {
    for (const [vaultId, vault] of Object.entries(breakdown.vaultEquity)) {
      if (vault.teaEquitySIR && Number(vault.teaEquitySIR) > 0) {
        items.push({ label: `Vault ${vaultId} TEA Equity`, value: formatSIRAmount(vault.teaEquitySIR) });
      }
      if (vault.apeEquitySIR && Number(vault.apeEquitySIR) > 0) {
        items.push({ label: `Vault ${vaultId} Leverage Equity`, value: formatSIRAmount(vault.apeEquitySIR) });
      }
    }
  }

  // LP Rewards
  if (breakdown.unclaimedLperRewards && Number(breakdown.unclaimedLperRewards) > 0) {
    items.push({ label: "Unclaimed LP Rewards", value: formatSIRAmount(breakdown.unclaimedLperRewards) });
  }

  // Contributor Rewards
  if (breakdown.unclaimedContributorRewards && Number(breakdown.unclaimedContributorRewards) > 0) {
    items.push({ label: "Unclaimed Contributor Rewards", value: formatSIRAmount(breakdown.unclaimedContributorRewards) });
  }
  if (breakdown.unissuedContributorRewards && Number(breakdown.unissuedContributorRewards) > 0) {
    items.push({ label: "Unissued Contributor Rewards", value: formatSIRAmount(breakdown.unissuedContributorRewards) });
  }

  // Uniswap V3
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

export const AllocationDetailRow: FC<AllocationDetailRowProps> = ({
  allocation,
  address: _address,
}) => {

  if (isFixedAllocation(allocation)) {
    return (
      <div className="space-y-6 rounded-lg bg-background p-6">
        {/* Fixed Contributor Details */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-green-400">
            MegaETH Fixed Contributor
          </h4>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <div className="rounded-lg bg-green-500/20 border border-green-500/40 p-4">
              <p className="text-xs text-green-300">Basis Points of Total</p>
              <p className="font-mono text-2xl font-bold text-green-400">
                {allocation.basisPointsOfTotal}
              </p>
            </div>
            <div className="rounded-lg bg-green-500/20 border border-green-500/40 p-4">
              <p className="text-xs text-green-300">% of Total Issuance</p>
              <p className="font-mono text-2xl font-bold text-green-400">
                {allocation.percentOfTotalIssuance}
              </p>
            </div>
            <div className="rounded-lg bg-green-500/20 border border-green-500/40 p-4">
              <p className="text-xs text-green-300">% of Contributor Pool</p>
              <p className="font-mono text-2xl font-bold text-green-400">
                {allocation.percentOfContributorPool}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isWeightedAllocation(allocation)) {
    const { sources, percentageBreakdown } = allocation;

    // TVL weights used for calculation
    const TVL_SIR = 66000;
    const TVL_HYPERSIR = 10000;
    const TOTAL_TVL = TVL_SIR + TVL_HYPERSIR;

    // Calculate weighted contributions from each chain
    const ethPercentage = parseFloat(percentageBreakdown.ethereumPercentage) || 0;
    const hyperPercentage = parseFloat(percentageBreakdown.hyperEVMPercentage) || 0;
    const weightedPercentage = parseFloat(percentageBreakdown.weightedPercentage) || 0;

    // How much each chain contributes to the final weighted percentage
    const ethContribution = (ethPercentage * TVL_SIR) / TOTAL_TVL;
    const hyperContribution = (hyperPercentage * TVL_HYPERSIR) / TOTAL_TVL;

    // Prepare breakdown chart data
    const breakdownData = {
      labels: ["From SIR", "From HyperSIR", "Final Weighted"],
      datasets: [
        {
          label: "Percentage Breakdown",
          data: [ethContribution, hyperContribution, weightedPercentage],
          backgroundColor: [
            "rgba(59, 130, 246, 0.8)",
            "rgba(168, 85, 247, 0.8)",
            "rgba(34, 197, 94, 0.8)",
          ],
          borderColor: [
            "rgba(59, 130, 246, 1)",
            "rgba(168, 85, 247, 1)",
            "rgba(34, 197, 94, 1)",
          ],
          borderWidth: 2,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context: TooltipItem<'bar'>) {
              const value = context.parsed.y;
              return `${value.toFixed(4)}%`;
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "rgb(156, 163, 175)",
          },
          grid: {
            color: "rgba(156, 163, 175, 0.1)",
          },
        },
        x: {
          ticks: {
            color: "rgb(156, 163, 175)",
          },
          grid: {
            color: "rgba(156, 163, 175, 0.1)",
          },
        },
      },
    };

    return (
      <div className="space-y-6 rounded-lg bg-background p-6">
        {/* TVL Weight Explanation */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-text-primary">
            How This Allocation Is Calculated
          </h4>
          <div className="rounded-lg bg-gray-500/10 border border-gray-500/30 p-4">
            <p className="text-xs text-gray-400 mb-3">
              Your MegaETH allocation is a TVL-weighted average of your staked SIR and HyperSIR:
            </p>
            <div className="font-mono text-xs text-gray-300 bg-black/30 rounded p-3 overflow-x-auto">
              <span className="text-green-400">weighted%</span> = (<span className="text-blue-400">SIR%</span> × <span className="text-blue-300">{TVL_SIR.toLocaleString()}</span> + <span className="text-purple-400">HyperSIR%</span> × <span className="text-purple-300">{TVL_HYPERSIR.toLocaleString()}</span>) / <span className="text-gray-400">{TOTAL_TVL.toLocaleString()}</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="text-gray-400">
                <span className="text-blue-400">SIR TVL weight:</span> {((TVL_SIR / TOTAL_TVL) * 100).toFixed(1)}%
              </div>
              <div className="text-gray-400">
                <span className="text-purple-400">HyperSIR TVL weight:</span> {((TVL_HYPERSIR / TOTAL_TVL) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Allocation Breakdown Chart */}
        <div>
          <h4 className="mb-4 text-sm font-semibold text-text-primary">
            Weighted Contribution Breakdown
          </h4>
          <div className="h-48">
            <Bar data={breakdownData} options={chartOptions} />
          </div>
        </div>

        {/* SIR (Ethereum) Sources */}
        {sources.ethereum && (
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-400">
              SIR (86.8% weight)
            </h4>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <div className="rounded-lg bg-blue-500/20 border border-blue-500/40 p-3">
                <p className="text-xs text-blue-300">Total SIR</p>
                <p className="font-mono text-lg font-bold text-blue-400">
                  {formatSIRAmount(sources.ethereum.totalSIR)}
                </p>
              </div>
              <div className="rounded-lg bg-blue-500/20 border border-blue-500/40 p-3">
                <p className="text-xs text-blue-300">% of SIR Supply</p>
                <p className="font-mono text-lg font-bold text-blue-400">
                  {ethPercentage.toFixed(4)}%
                </p>
              </div>
              <div className="rounded-lg bg-blue-500/20 border border-blue-500/40 p-3">
                <p className="text-xs text-blue-300">Weighted Contribution</p>
                <p className="font-mono text-lg font-bold text-blue-400">
                  {ethContribution.toFixed(4)}%
                </p>
                <p className="text-xs text-blue-300/70 mt-1">
                  {ethPercentage.toFixed(2)}% × 86.8%
                </p>
              </div>
            </div>
            {/* Detailed Breakdown */}
            {sources.ethereum.breakdown && (
              <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
                <p className="text-xs text-blue-300 mb-2 font-semibold">Breakdown</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {getBreakdownItems(sources.ethereum.breakdown).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-blue-300/70">{item.label}</span>
                      <span className="font-mono text-blue-400">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* HyperSIR Sources */}
        {sources.hyperevm && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-purple-400">HyperSIR (13.2% weight)</h4>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <div className="rounded-lg bg-purple-500/20 border border-purple-500/40 p-3">
                <p className="text-xs text-purple-300">Total HyperSIR</p>
                <p className="font-mono text-lg font-bold text-purple-400">
                  {formatSIRAmount(sources.hyperevm.totalSIR)}
                </p>
              </div>
              <div className="rounded-lg bg-purple-500/20 border border-purple-500/40 p-3">
                <p className="text-xs text-purple-300">% of HyperSIR Supply</p>
                <p className="font-mono text-lg font-bold text-purple-400">
                  {hyperPercentage.toFixed(4)}%
                </p>
              </div>
              <div className="rounded-lg bg-purple-500/20 border border-purple-500/40 p-3">
                <p className="text-xs text-purple-300">Weighted Contribution</p>
                <p className="font-mono text-lg font-bold text-purple-400">
                  {hyperContribution.toFixed(4)}%
                </p>
                <p className="text-xs text-purple-300/70 mt-1">
                  {hyperPercentage.toFixed(2)}% × 13.2%
                </p>
              </div>
            </div>
            {/* Detailed Breakdown */}
            {sources.hyperevm.breakdown && (
              <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3">
                <p className="text-xs text-purple-300 mb-2 font-semibold">Breakdown</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {getBreakdownItems(sources.hyperevm.breakdown).map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-purple-300/70">{item.label}</span>
                      <span className="font-mono text-purple-400">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Final Calculation */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-green-400">Final MegaETH Allocation</h4>
          <div className="rounded-lg bg-green-500/20 border border-green-500/40 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-300">Weighted Percentage (of contributor pool)</p>
                <p className="font-mono text-2xl font-bold text-green-400">
                  {weightedPercentage.toFixed(4)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-green-300">Calculation</p>
                <p className="font-mono text-sm text-green-400/80">
                  {sources.ethereum && <span className="text-blue-400">{ethContribution.toFixed(2)}%</span>}
                  {sources.ethereum && sources.hyperevm && <span className="text-gray-400"> + </span>}
                  {sources.hyperevm && <span className="text-purple-400">{hyperContribution.toFixed(2)}%</span>}
                  <span className="text-gray-400"> = </span>
                  <span className="text-green-400">{weightedPercentage.toFixed(2)}%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AllocationDetailRow;
