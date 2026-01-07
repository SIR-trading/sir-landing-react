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
import { isWeightedAllocation, isFixedAllocation } from "~/types/allocations";

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
      .sort(([, a], [, b]) => parseFloat(b.allocationPerc) - parseFloat(a.allocationPerc))
      .slice(0, 10)
      .map(([address, allocation]) => ({
        address,
        allocation: parseInt(allocation.allocation),
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

  // Calculate type breakdown (fixed vs weighted)
  const typeBreakdown = useMemo(() => {
    const totals = {
      fixed: 0,
      weighted: 0,
    };

    Object.values(allocations).forEach((allocation) => {
      const perc = parseFloat(allocation.allocationPerc);
      if (isFixedAllocation(allocation)) {
        totals.fixed += perc;
      } else if (isWeightedAllocation(allocation)) {
        totals.weighted += perc;
      }
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

  // Type breakdown chart data
  const typeBreakdownChartData = {
    labels: ["Fixed Contributors", "Weighted Holders"],
    datasets: [
      {
        data: [
          typeBreakdown.fixed,
          typeBreakdown.weighted,
        ],
        backgroundColor: [
          "rgba(106, 60, 153, 0.8)", // Purple for fixed
          "rgba(204, 102, 119, 0.8)", // Pink for weighted
        ],
        borderColor: [
          "rgba(106, 60, 153, 1)",
          "rgba(204, 102, 119, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const typeBreakdownChartOptions = {
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
            return `${label}: ${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Top 10 Allocations */}
      <div className="rounded-lg bg-white/5 p-4 md:p-6">
        <h3 className="mb-4 font-semibold text-text-primary">
          Top 10 Allocations
        </h3>
        <div className="h-64 md:h-80">
          <Bar data={top10ChartData} options={top10ChartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {/* Allocation Distribution */}
        <div className="rounded-lg bg-white/5 p-4 md:p-6">
          <h3 className="mb-4 font-semibold text-text-primary">
            Allocation Distribution
          </h3>
          <div className="mx-auto max-w-xs">
            <Pie
              data={distributionChartData}
              options={distributionChartOptions}
            />
          </div>
        </div>

        {/* Type Breakdown */}
        <div className="rounded-lg bg-white/5 p-4 md:p-6">
          <h3 className="mb-4 font-semibold text-text-primary">
            Allocation by Type
          </h3>
          <div className="mx-auto max-w-xs">
            <Pie
              data={typeBreakdownChartData}
              options={typeBreakdownChartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationStats;
