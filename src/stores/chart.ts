"use client";
import { useCallback, useEffect, useState } from "react";
import type { ChartData } from "chart.js";

export const useChartData = () => {
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);

  const loadChartData = useCallback(async () => {
    const rawData = await import("~/assets/chart_data.json");
    return {
      labels: rawData.dates,
      datasets: [
        {
          label: "ETH",
          backgroundColor: "#659ba0",
          borderColor: "#659ba0",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          data: rawData.eth_line,
        },
        {
          label: "SIR",
          backgroundColor: "#dea55b",
          borderColor: "#dea55b",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          data: rawData.sir_line,
        },
        {
          label: "Squeeth",
          backgroundColor: "#ff7300",
          borderColor: "#ff7300",
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          data: rawData.squeeth_aligned,
        },
      ],
    };
  }, []);

  useEffect(() => {
    loadChartData()
      .then(setChartData)
      .catch((e) => {
        console.error("Error loading chart data", e);
      });
  }, [loadChartData]);

  return chartData;
};
