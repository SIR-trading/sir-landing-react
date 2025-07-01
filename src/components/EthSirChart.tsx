"use client";
import React, { useMemo, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  TimeScale,
  Filler,
  type ChartOptions,
} from "chart.js";
import { useChartData } from "~/stores/chart";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Filler
);

const EthSirChart: React.FC = () => {
  const chartData = useChartData();

  const chartOptions: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800,
        easing: "easeOutCubic",
      },
      layout: {
        padding: { top: 8, right: 12, left: 4, bottom: 4 },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            padding: 12,
            font: { size: 12, weight: "500" },
            color: "rgba(255,255,255,0.7)",
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "#191919",
          titleFont: { size: 12, weight: "600" },
          bodyFont: { size: 12 },
          borderColor: "#333",
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "rgba(255,255,255,0.55)",
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
        y: {
          grid: {
            color: "rgba(255,255,255,0.05)",
            drawBorder: false,
          },
          ticks: {
            color: "rgba(255,255,255,0.55)",
            callback: val => "$" + val.toLocaleString(),
          },
        },
      },
    }),
    []
  );

  /* Palettes that fit both light and dark backgrounds */
  const palette = {
    eth: "#67c8c3",
    sir: "#d4af37", 
    squeeth: "#fb7185"
  };

  /* Inject fills and border styles on first render */
  const processedData = useMemo(() => {
    if (!chartData) return chartData;

    return {
      ...chartData,
      datasets: chartData.datasets.map(ds => {
        const color =
          ds.label === "ETH"
            ? palette.eth
            : ds.label === "SIR"
            ? palette.sir
            : palette.squeeth;

        return {
          ...ds,
          borderColor: color,
          backgroundColor: ctx => {
            const { chart } = ctx;
            const { ctx: c } = chart;
            const gradient = c.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, color + "55");
            gradient.addColorStop(1, color + "05");
            return gradient;
          },
          tension: 0.25,
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
        };
      }),
    };
  }, [chartData]);

  /* Keep the 3:2 ratio regardless of parent width */
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrapperRef.current) return;
    const handleResize = () => {
      if (!wrapperRef.current) return;
      wrapperRef.current.style.height =
        wrapperRef.current.offsetWidth * 0.66 + "px";
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-[100%] md:w-[80%] rounded-md bg-background/80 dark:bg-white/10"
    >
      {processedData ? (
        <Line data={processedData} options={chartOptions} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default EthSirChart;
