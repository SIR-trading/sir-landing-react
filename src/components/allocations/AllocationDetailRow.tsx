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
import type { AddressAllocation } from "~/types/allocations";
import TooltipMain from "~/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

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

export const AllocationDetailRow: FC<AllocationDetailRowProps> = ({
  allocation,
  address: _address,
}) => {
  const { sources, allocationBreakdown } = allocation;

  // Prepare breakdown chart data
  const breakdownData = {
    labels: ["Ethereum", "Hypurr", "HyperEVM", "Treasury"],
    datasets: [
      {
        label: "Allocation Breakdown",
        data: [
          allocationBreakdown.fromEthereum ?? 0,
          allocationBreakdown.fromHypurr ?? 0,
          allocationBreakdown.fromHyperEVMContributor ?? 0,
          allocationBreakdown.fromTreasury ?? 0,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(234, 179, 8, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(234, 179, 8, 1)",
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
            return `Allocation: ${value.toLocaleString()}`;
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

  const formatNumber = (value: string | number | undefined): string => {
    if (!value) return "0";
    return Number(value).toLocaleString();
  };

  return (
    <div className="space-y-6 rounded-lg bg-background-light dark:bg-background p-6">
      {/* Allocation Breakdown Chart */}
      <div>
        <h4 className="mb-4 text-sm font-semibold text-black dark:text-white">
          Allocation Breakdown
        </h4>
        <div className="h-48">
          <Bar data={breakdownData} options={chartOptions} />
        </div>
      </div>

      {/* Ethereum Sources */}
      {sources.ethereum && (
        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-blue-400">
            Ethereum Sources
          </h4>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {sources.ethereum.sirBalance !== undefined && (
              <div className="rounded-lg bg-background-light/50 dark:bg-white/5 p-3">
                <p className="text-xs text-section-light dark:text-section">
                  SIR Balance
                </p>
                <p className="font-mono text-sm text-black dark:text-white">
                  {formatNumber(sources.ethereum.sirBalance)}
                </p>
              </div>
            )}
            {sources.ethereum.stakedSIR && (
              <>
                <div className="rounded-lg bg-background-light/50 dark:bg-white/5 p-3">
                  <p className="text-xs text-section-light dark:text-section">
                    Staked SIR (Unlocked)
                  </p>
                  <p className="font-mono text-sm text-black dark:text-white">
                    {formatNumber(sources.ethereum.stakedSIR.unlockedStake)}
                  </p>
                </div>
                <div className="rounded-lg bg-background-light/50 dark:bg-white/5 p-3">
                  <p className="text-xs text-section-light dark:text-section">
                    Staked SIR (Locked)
                  </p>
                  <p className="font-mono text-sm text-black dark:text-white">
                    {formatNumber(sources.ethereum.stakedSIR.lockedStake)}
                  </p>
                </div>
              </>
            )}
            {sources.ethereum.unclaimedLperRewards !== undefined && (
              <div className="rounded-lg bg-background-light/50 dark:bg-white/5 p-3">
                <p className="text-xs text-section-light dark:text-section">
                  Unclaimed LP Rewards
                </p>
                <p className="font-mono text-sm text-black dark:text-white">
                  {formatNumber(sources.ethereum.unclaimedLperRewards)}
                </p>
              </div>
            )}
            {sources.ethereum.unclaimedContributorRewards !== undefined && (
              <div className="rounded-lg bg-background-light/50 dark:bg-white/5 p-3">
                <p className="text-xs text-section-light dark:text-section">
                  Unclaimed Contributor Rewards
                </p>
                <p className="font-mono text-sm text-black dark:text-white">
                  {formatNumber(sources.ethereum.unclaimedContributorRewards)}
                </p>
              </div>
            )}
            {sources.ethereum.unissuedContributorRewards !== undefined && (
              <div className="rounded-lg bg-background-light/50 dark:bg-white/5 p-3">
                <p className="text-xs text-section-light dark:text-section">
                  Unissued Contributor Rewards
                </p>
                <p className="font-mono text-sm text-black dark:text-white">
                  {formatNumber(sources.ethereum.unissuedContributorRewards)}
                </p>
              </div>
            )}
            {sources.ethereum.uniswapV3Equity !== undefined && (
              <div className="rounded-lg bg-background-light/50 dark:bg-white/5 p-3">
                <p className="text-xs text-section-light dark:text-section">
                  Uniswap V3 Equity
                </p>
                <p className="font-mono text-sm text-black dark:text-white">
                  {formatNumber(sources.ethereum.uniswapV3Equity)}
                </p>
              </div>
            )}
            {sources.ethereum.uniswapV3UnclaimedFees !== undefined && (
              <div className="rounded-lg bg-background-light/50 dark:bg-white/5 p-3">
                <p className="text-xs text-section-light dark:text-section">
                  Uniswap V3 Unclaimed Fees
                </p>
                <p className="font-mono text-sm text-black dark:text-white">
                  {formatNumber(sources.ethereum.uniswapV3UnclaimedFees)}
                </p>
              </div>
            )}
            {sources.ethereum.uniswapV3StakingRewards !== undefined && (
              <div className="rounded-lg bg-background-light/50 dark:bg-white/5 p-3">
                <p className="text-xs text-section-light dark:text-section">
                  Uniswap V3 Staking Rewards
                </p>
                <p className="font-mono text-sm text-black dark:text-white">
                  {formatNumber(sources.ethereum.uniswapV3StakingRewards)}
                </p>
              </div>
            )}
            {sources.ethereum.totalSIR !== undefined && (
              <div className="col-span-full rounded-lg bg-blue-500/20 border border-blue-500/40 p-3">
                <p className="text-xs font-semibold text-blue-400">
                  Total SIR from Ethereum
                </p>
                <p className="font-mono text-lg font-bold text-blue-400">
                  {formatNumber(sources.ethereum.totalSIR)}
                </p>
              </div>
            )}
            {sources.ethereum.isContract && (
              <div className="col-span-full rounded-lg bg-orange-500/20 border border-orange-500/40 p-2 flex items-center gap-2">
                <TooltipMain
                  trigger={<InfoIcon className="h-4 w-4 text-orange-400" />}
                  content="This address is a smart contract"
                />
                <p className="text-xs text-orange-400">Smart Contract Address</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hypurr NFTs */}
      {sources.hypurr && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-purple-400">Hypurr NFTs</h4>
          <div className="rounded-lg bg-purple-500/20 border border-purple-500/40 p-4">
            <p className="text-xs text-purple-300">NFT Count</p>
            <p className="font-mono text-2xl font-bold text-purple-400">
              {sources.hypurr.nftCount}
            </p>
          </div>
        </div>
      )}

      {/* HyperEVM Contributor */}
      {sources.hyperevmContributor && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-green-400">
            HyperEVM Contributor
          </h4>
          <div className="rounded-lg bg-green-500/20 border border-green-500/40 p-4">
            <p className="text-xs text-green-300">Basis Points</p>
            <p className="font-mono text-2xl font-bold text-green-400">
              {sources.hyperevmContributor.basisPoints}
            </p>
            <p className="text-xs text-green-300 mt-1">
              ({(sources.hyperevmContributor.basisPoints / 100).toFixed(2)}%)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllocationDetailRow;
