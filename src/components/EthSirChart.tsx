// components/EthSirChart.tsx
import React, {useMemo} from 'react';
import { Line } from 'react-chartjs-2';
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
    TimeScale, type ChartOptions,
} from 'chart.js';
import {useChartData} from '~/stores/chart';

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
    const chartOptions: ChartOptions<"line"> = useMemo(() => ({
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'rgba(255, 255, 255, 1)',
                },
            },
        },
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
        },
        scales: {
            x: {
                grid: {
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                    callback: function(val, index) {
                        return index % 4 === 0 ? this.getLabelForValue(Number(val)) : '';
                    },
                    color: 'rgba(255, 255, 255, 1)'
                }
            },
            y: {
                grid: {
                    color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                    callback: function(val) {
                        return "$" + this.getLabelForValue(Number(val));
                    },
                    color: 'rgba(255, 255, 255, 1)'
                }
            },
        }
    }), []);

    return (
        <div className="w-full h-[250px] md:w-[700px] md:h-[400px] bg-[rgba(255,255,255,0.1)] flex items-center justify-center p-1 md:p-3 rounded-md">
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