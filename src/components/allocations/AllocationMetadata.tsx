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
  allocationsData,
}: AllocationMetadataProps) => {
  // Get treasury allocation from the newTreasury address
  const treasuryAllocation = allocationsData.allocations[metadata.newTreasury];
  const treasuryActualPercentage = treasuryAllocation
    ? parseFloat(treasuryAllocation.allocationPerc.replace('%', ''))
    : 0;

  // Calculate the "Remainder" percentage
  const treasuryRemainderPercentage = 100 -
    (parseFloat(metadata.allocationDistribution.lpAllocation) +
      parseFloat(metadata.allocationDistribution.sirHolders) +
      parseFloat(metadata.allocationDistribution.hypurrHolders) +
      parseFloat(metadata.allocationDistribution.hyperevmContributors));

  // The difference between actual treasury and remainder is what was taken from SIR holders
  const treasuryExtraFromSirHolders = treasuryActualPercentage - treasuryRemainderPercentage;

  // Adjust SIR holders percentage
  const sirHoldersPercentage = parseFloat(metadata.allocationDistribution.sirHolders) - treasuryExtraFromSirHolders;

  const pieData = {
    labels: [
      "Liquidity Providers",
      "SIR Holders",
      "Hypurr Holders",
      "HyperEVM Contributors",
      "Treasury",
    ],
    datasets: [
      {
        data: [
          parseFloat(metadata.allocationDistribution.lpAllocation),
          sirHoldersPercentage,
          parseFloat(metadata.allocationDistribution.hypurrHolders),
          parseFloat(metadata.allocationDistribution.hyperevmContributors),
          treasuryActualPercentage,
        ],
        backgroundColor: [
          "#CC9901", // Gold for LP (Liquidity providers)
          "#CC6677", // Pink for SIR Holders (Presale)
          "#117733", // Green for Hypurr Holders (Compensation fund)
          "#6A3C99", // Purple for HyperEVM Contributors (Team & Contributors)
          "#882255", // Magenta for Treasury
        ],
        hoverBackgroundColor: [
          "#CC9901", // Same as backgroundColor - no color change on hover
          "#CC6677",
          "#117733",
          "#6A3C99",
          "#882255",
        ],
        borderColor: [
          "#CC9901",
          "#CC6677",
          "#117733",
          "#6A3C99",
          "#882255",
        ],
        borderWidth: 2,
        hoverOffset: 15, // Increase size on hover
      },
    ],
  };

  // Second pie chart - 100% LP after 3 years
  const pieDataAfterThreeYears = {
    labels: ["Liquidity Providers"],
    datasets: [
      {
        data: [100],
        backgroundColor: ["#CC9901"],
        hoverBackgroundColor: ["#CC9901"],
        borderColor: ["#CC9901"],
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: 20, // Add padding to prevent clipping when hover offset expands
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<'pie'>) {
            const value = context.parsed ?? 0;
            return `${value.toFixed(2)}%`;
          },
        },
      },
    },
  };

  const legendItems = [
    { label: "Liquidity Providers", color: "#CC9901" },
    { label: "SIR Holders", color: "#CC6677" },
    { label: "Hypurr Holders", color: "#117733" },
    { label: "HyperEVM Contributors", color: "#6A3C99" },
    { label: "Treasury", color: "#882255" },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
        {/* First chart - Current allocation */}
        <div className="flex flex-col items-center max-w-sm w-full">
          <h4 className="text-center font-semibold text-black dark:text-white mb-4">
            First Three Years
          </h4>
          <Pie data={pieData} options={chartOptions} />
        </div>

        {/* Second chart - After 3 years */}
        <div className="flex flex-col items-center max-w-sm w-full">
          <h4 className="text-center font-semibold text-black dark:text-white mb-4">
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
            <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllocationMetadata;
