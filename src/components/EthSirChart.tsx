"use client";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  TimeScale,
  type ChartOptions,
} from "chart.js";
import { useChartData } from "~/stores/chart";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
);

const EthSirChart: React.FC = () => {
  const chartData = useChartData();
  const chartOptions: ChartOptions<"line"> = useMemo(
    () =>
      ({
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
            labels: {
              color: "rgba(255, 255, 255, 0.5)",
              font: {
                size: 10,
              },
            },
          },
        },
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: "easeInOutQuart",
        },
        scales: {
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              callback: function (val, index) {
                return index % 4 === 0
                  ? this.getLabelForValue(Number(val))
                  : "";
              },
              color: "rgba(255, 255, 255, 0.4)",
            },
          },
          y: {
            grid: {
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              callback: function (val) {
                return "$" + this.getLabelForValue(Number(val));
              },
              color: "rgba(255, 255, 255, 0.4)",
            },
          },
        },
      }) as const,
    [],
  );

  return (
    <div className="bg-background flex h-[250px] w-full items-center justify-center rounded-md md:h-[400px] md:w-[700px] md:p-3 dark:bg-white/10">
      {chartData ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <div className="flex items-center justify-center">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default EthSirChart;
