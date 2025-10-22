"use client";
import { type FC, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  type TooltipItem,
} from "chart.js";
import type { AddressAllocation } from "~/types/allocations";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

interface AllocationStatsProps {
  allocations: Record<string, AddressAllocation>;
}

export const AllocationStats: FC<AllocationStatsProps> = ({ allocations }) => {
  // Calculate top 10 allocations
  const top10 = useMemo(() => {
    return Object.entries(allocations)
      .sort(([, a], [, b]) => b.allocation - a.allocation)
      .slice(0, 10)
      .map(([address, allocation]) => ({
        address,
        allocation: allocation.allocation,
        percentage: allocation.allocationPerc,
      }));
  }, [allocations]);

  // Calculate distribution ranges
  const distribution = useMemo(() => {
    const ranges = {
      ">1%": 0,
      "0.1-1%": 0,
      "0.01-0.1%": 0,
      "<0.01%": 0,
    };

    Object.values(allocations).forEach((allocation) => {
      const perc = parseFloat(allocation.allocationPerc);
      if (perc > 1) ranges[">1%"]++;
      else if (perc >= 0.1) ranges["0.1-1%"]++;
      else if (perc >= 0.01) ranges["0.01-0.1%"]++;
      else ranges["<0.01%"]++;
    });

    return ranges;
  }, [allocations]);

  // Calculate source breakdown
  const sourceBreakdown = useMemo(() => {
    const totals = {
      ethereum: 0,
      hypurr: 0,
      hyperevmContributor: 0,
      treasury: 0,
    };

    Object.values(allocations).forEach((allocation) => {
      totals.ethereum += allocation.allocationBreakdown.fromEthereum ?? 0;
      totals.hypurr += allocation.allocationBreakdown.fromHypurr ?? 0;
      totals.hyperevmContributor +=
        allocation.allocationBreakdown.fromHyperEVMContributor ?? 0;
      totals.treasury += allocation.allocationBreakdown.fromTreasury ?? 0;
    });

    return totals;
  }, [allocations]);

  // Top 10 chart data
  const top10ChartData = {
    labels: top10.map((item) => `${item.address.slice(0, 6)}...${item.address.slice(-4)}`),
    datasets: [
      {
        label: "Allocation",
        data: top10.map((item) => item.allocation),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  const top10ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'bar'>) {
            const item = top10[context.dataIndex];
            return [
              `Address: ${item?.address ?? 'N/A'}`,
              `Allocation: ${item?.allocation.toLocaleString() ?? 'N/A'}`,
              `Percentage: ${item?.percentage ?? 'N/A'}`,
            ];
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

  // Distribution chart data
  const distributionChartData = {
    labels: Object.keys(distribution),
    datasets: [
      {
        data: Object.values(distribution),
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(234, 179, 8, 0.8)",
          "rgba(34, 197, 94, 0.8)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const distributionChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "rgb(156, 163, 175)",
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            const label = context.label ?? '';
            const value = context.parsed;
            return `${label}: ${value} addresses`;
          },
        },
      },
    },
  };

  // Source breakdown chart data
  const sourceBreakdownChartData = {
    labels: ["Ethereum", "Hypurr", "HyperEVM", "Treasury"],
    datasets: [
      {
        data: [
          sourceBreakdown.ethereum,
          sourceBreakdown.hypurr,
          sourceBreakdown.hyperevmContributor,
          sourceBreakdown.treasury,
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

  const sourceBreakdownChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "rgb(156, 163, 175)",
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            const label = context.label ?? '';
            const value = context.parsed;
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Top 10 Allocations */}
      <div className="rounded-lg bg-background-light dark:bg-white/5 p-4 md:p-6">
        <h3 className="mb-4 font-semibold text-black dark:text-white">
          Top 10 Allocations
        </h3>
        <div className="h-64 md:h-80">
          <Bar data={top10ChartData} options={top10ChartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* Allocation Distribution */}
        <div className="rounded-lg bg-background-light dark:bg-white/5 p-4 md:p-6">
          <h3 className="mb-4 font-semibold text-black dark:text-white">
            Allocation Distribution
          </h3>
          <div className="mx-auto max-w-xs">
            <Pie
              data={distributionChartData}
              options={distributionChartOptions}
            />
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="rounded-lg bg-background-light dark:bg-white/5 p-4 md:p-6">
          <h3 className="mb-4 font-semibold text-black dark:text-white">
            Total Allocation by Source
          </h3>
          <div className="mx-auto max-w-xs">
            <Pie
              data={sourceBreakdownChartData}
              options={sourceBreakdownChartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationStats;
