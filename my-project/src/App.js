import React, { useState } from "react";
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
  const [darkMode, setDarkMode] = useState(false);

  const plData = [4.30, -1.07, 11, -2.66, 7.78, 24.78, -10.83, -2.84, -0.76, 21.11];
  const buyValues = [1200, 1400, 1350, 1500, 1600, 1550, 1700, 1750, 1800, 1900];


  let cumulative = 0;
  const cumulativePL = plData.map((p) => (cumulative += p));
  const totalProfit = plData.filter((p) => p > 0).reduce((a, b) => a + b, 0);
  const totalLoss = plData.filter((p) => p < 0).reduce((a, b) => a + b, 0);

  const data = {
    labels: buyValues.map(v => `$${v}`), // 💰 Label X-axis with dollar values
    datasets: [
      {
        label: "Cumulative P/L %",
        data: cumulativePL,
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3B82F6",
        tension: 0.4,
        pointBackgroundColor: plData.map((p) => (p >= 0 ? "#10B981" : "#EF4444")),
        pointBorderColor: darkMode ? "#F9FAFB" : "#111827",
        pointRadius: 6,
        pointHoverRadius: 10,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to scale in height dynamically
    interaction: { mode: "nearest", intersect: false },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: darkMode ? "#1F2937" : "#111827",
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
        text: "💰 My Equity Portfolio Performance",
        font: { size: 22, weight: "bold" },
        color: darkMode ? "#F9FAFB" : "#111827",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Money Invested", color: darkMode ? "#F9FAFB" : "#374151", font: { size: 14 } },
        grid: { color: darkMode ? "#374151" : "#E5E7EB" },
        ticks: { color: darkMode ? "#F9FAFB" : "#374151", maxRotation: 45, minRotation: 0 },
      },
      y: {
        title: { display: true, text: "Cumulative P/L %", color: darkMode ? "#F9FAFB" : "#374151", font: { size: 14 } },
        grid: { color: darkMode ? "#374151" : "#E5E7EB" },
        ticks: { color: darkMode ? "#F9FAFB" : "#374151" },
      },
    },
  };

  return (
    <div className={`transition-colors duration-500 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-gray-800"} min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 md:px-12`}>
      
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`mb-6 px-4 py-2 rounded-full font-semibold shadow-md transition-colors duration-300 text-sm sm:text-base ${darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
      >
        {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      {/* Header */}
      <header className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-lg text-center md:text-left">
          Jaswanth's Portfolio Dashboard
        </h1>
        <div className={`flex flex-col md:items-end gap-2 p-4 rounded-xl shadow-md min-w-[180px] ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-green-50 to-red-50"}`}>
          <p className="text-green-400 font-bold text-base sm:text-lg">Total Profit: {totalProfit.toFixed(2)}%</p>
          <p className="text-red-400 font-bold text-base sm:text-lg">Total Loss: {totalLoss.toFixed(2)}%</p>
        </div>
      </header>

      {/* Chart */}
      <div className={`w-full max-w-5xl rounded-3xl shadow-2xl p-4 sm:p-8 hover:shadow-3xl transition-shadow duration-300 h-[300px] sm:h-[400px] md:h-[500px] ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <Line data={data} options={options} />
      </div>

      {/* Footer / Note */}
      <p className="mt-6 text-sm sm:text-base italic text-gray-400 text-center">
        Profitable trades are highlighted in green, while losing trades are shown in red for better clarity.
      </p>
    </div>
  );
}

export default App;
