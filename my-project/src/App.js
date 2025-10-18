// App.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const plData = [4.30, -1.07, 11, -2.66, 7.78, 24.78, -10.83, -2.84, -0.76, 21.11];
  const dates = [
    "2025-03-01",
    "2025-03-04",
    "2025-03-07",
    "2025-03-10",
    "2025-03-13",
    "2025-03-16",
    "2025-03-19",
    "2025-03-22",
    "2025-03-25",
    "2025-03-28",
  ];

  let cumulative = 0;
  const cumulativePL = plData.map((p) => {
    cumulative += p;
    return cumulative;
  });

  const totalProfit = plData.filter((p) => p > 0).reduce((a, b) => a + b, 0);
  const totalLoss = plData.filter((p) => p < 0).reduce((a, b) => a + b, 0);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Cumulative P/L %",
        data: cumulativePL,
        fill: false,
        borderColor: "#3B82F6",
        tension: 0.4,
        pointBackgroundColor: plData.map((p) => (p >= 0 ? "#10B981" : "#EF4444")),
        pointBorderColor: "#111827",
        pointRadius: 8,
        pointHoverRadius: 12,
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "nearest", intersect: false },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        padding: 12,
        callbacks: {
          label: function (ctx) {
            const idx = ctx.dataIndex;
            return `Cumulative: ${cumulativePL[idx].toFixed(
              2
            )}% | Change: ${plData[idx].toFixed(2)}%`;
          },
        },
      },
      legend: { display: false },
      title: {
        display: true,
        text: "📈 My Portfolio Performance",
        font: { size: 22, weight: "bold" },
        color: "#111827",
      },
    },
    animation: { duration: 1500, easing: "easeOutQuart" },
    scales: {
      x: { title: { display: true, text: "Date", color: "#374151", font: { size: 14 } }, grid: { color: "#E5E7EB" } },
      y: { title: { display: true, text: "Cumulative P/L %", color: "#374151", font: { size: 14 } }, grid: { color: "#E5E7EB" } },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex flex-col items-center py-12 px-4">
      {/* Header */}
      <header className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-sm">
          My Portfolio Dashboard
        </h1>
        <div className="flex flex-col md:items-end gap-2 bg-gradient-to-r from-green-50 to-red-50 p-4 rounded-xl shadow-md">
          <p className="text-green-600 font-bold text-lg">Total Profit: {totalProfit.toFixed(2)}%</p>
          <p className="text-red-600 font-bold text-lg">Total Loss: {totalLoss.toFixed(2)}%</p>
        </div>
      </header>

      {/* Chart */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-300">
        <Line data={data} options={options} />
      </div>

      {/* Footer / Note */}
      <p className="mt-8 text-gray-500 italic text-sm">
        Positive points are marked in green, negative in red for clarity.
      </p>
    </div>
  );
}

export default App;
