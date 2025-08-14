import React from "react";
// Import Chart.js core and components to register them
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

// Register the components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyLineChart = () => {
  // Sample data and options
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [33, 53, 85, 41, 44, 65],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
    scales: {
      y: {
        type: "linear", // linear scale is now registered and valid
        beginAtZero: true,
      },
      x: {
        type: "category",
      },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default MyLineChart;
