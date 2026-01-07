"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type TooltipItem } from "chart.js";
import type { AllocationMetadata as AllocationMetadataType, AllocationsData } from "~/types/allocations";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AllocationMetadataProps {
  metadata: AllocationMetadataType;
  allocationsData: AllocationsData;
}

export const AllocationMetadata = ({
  metadata,
  allocationsData: _allocationsData,
}: AllocationMetadataProps) => {
  // Parse the fixed contributors percentage (e.g., "15%" -> 15)
  const fixedContributorsPercent = parseFloat(
    metadata.fixedContributors.percentOfTotalIssuance.replace("%", "")
  );

  // Parse the weighted holders percentage (e.g., "15%" -> 15)
  const weightedHoldersPercent = parseFloat(
    metadata.weightedHolders.remainingPercent.replace("%", "")
  );

  const treasuryPercent = 8;
  const contributorsPercent = fixedContributorsPercent - treasuryPercent;
  const sirHoldersPercent = 13;
  const hyperSirHoldersPercent = 2;

  const pieData = {
    labels: [
      "Liquidity Providers",
      "MegaETH Contributors",
      "Treasury",
      "SIR Holders",
      "HyperSIR Holders",
    ],
    datasets: [
      {
        data: [
          metadata.lpAllocationPercent,
          contributorsPercent,
          treasuryPercent,
          sirHoldersPercent,
          hyperSirHoldersPercent,
        ],
        backgroundColor: [
          "#D4A44C", // Amber gold for LP
          "#8B5CF6", // Purple for Contributors
          "#2D4A3E", // Forest green for Treasury
          "#722F37", // Burgundy for SIR Holders
          "#4A8B8B", // Teal for HyperSIR Holders
        ],
        hoverBackgroundColor: [
          "#E8B85A",
          "#A78BFA",
          "#3D6454",
          "#8B3D47",
          "#5FA3A3",
        ],
        borderColor: [
          "#D4A44C",
          "#8B5CF6",
          "#2D4A3E",
          "#722F37",
          "#4A8B8B",
        ],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  // Second pie chart - 100% LP after 3 years
  const pieDataAfterThreeYears = {
    labels: ["Liquidity Providers"],
    datasets: [
      {
        data: [100],
        backgroundColor: ["#D4A44C"],
        hoverBackgroundColor: ["#E8B85A"],
        borderColor: ["#D4A44C"],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            const value = context.parsed ?? 0;
            return `${value.toFixed(0)}%`;
          },
        },
      },
    },
  };

  const legendItems = [
    { label: "Liquidity Providers", color: "#D4A44C" },
    { label: "MegaETH Contributors", color: "#8B5CF6" },
    { label: "Treasury", color: "#2D4A3E" },
    { label: "SIR Holders", color: "#722F37" },
    { label: "HyperSIR Holders", color: "#4A8B8B" },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
        {/* First chart - Current allocation */}
        <div className="flex flex-col items-center max-w-sm w-full">
          <h4 className="text-center font-semibold text-text-primary mb-4">
            First Three Years
          </h4>
          <Pie data={pieData} options={chartOptions} />
        </div>

        {/* Second chart - After 3 years */}
        <div className="flex flex-col items-center max-w-sm w-full">
          <h4 className="text-center font-semibold text-text-primary mb-4">
            After Three Years
          </h4>
          <Pie data={pieDataAfterThreeYears} options={chartOptions} />
        </div>
      </div>

      {/* Custom Legend */}
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-6">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-4 w-6 rounded border-2"
              style={{
                backgroundColor: item.color,
                borderColor: item.color
              }}
            ></div>
            <span className="text-sm text-text-muted">{item.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AllocationMetadata;
