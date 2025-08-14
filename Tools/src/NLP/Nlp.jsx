import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Nlp.css";

// Register Chart.js components here
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SentimentNLP = () => {
  const [file, setFile] = useState(null);
  const [textColumn, setTextColumn] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    if (!file || !textColumn) {
      setError("Please upload a file and enter the text column name.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("text_column", textColumn);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/sentiment-analysis/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setTextColumn("");
    setResult(null);
    setError("");
    setLoading(false);
  };

  // Prepare data for chart
  const chartData = result?.sentiment_distribution
    ? {
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
          {
            label: "Sentiment Count",
            data: [
              result.sentiment_distribution.positive || 0,
              result.sentiment_distribution.negative || 0,
              result.sentiment_distribution.neutral || 0,
            ],
            backgroundColor: ["#4caf50", "#f44336", "#ffc107"],
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="ml-container">
      <div className="ml-header">
        <h1>Sentiment Analysis Tool</h1>
        <p>Upload your dataset to analyze sentiment in text data.</p>
      </div>

      <div className="ml-box">
        {!result ? (
          <form onSubmit={handleSubmit} className="ml-form">
            <div className="form-group">
              <label className="form-label">CSV File *</label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Text Column Name *</label>
              <input
                type="text"
                placeholder="e.g., review, comment, feedback"
                value={textColumn}
                onChange={(e) => setTextColumn(e.target.value)}
                className="form-input"
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Analyzing..." : "Run Sentiment Analysis"}
            </button>
          </form>
        ) : (
          <div className="results-container">
            <div className="success-banner">
              <h3>Sentiment Analysis Completed!</h3>
            </div>

            {/* Chart */}
            {chartData && (
              <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
              </div>
            )}

            {/* Results Table */}
            <div className="metrics-section">
              <h4>Sample Sentiment Results</h4>
              <table className="result-table">
                <thead>
                  <tr>
                    <th>Text</th>
                    <th>Polarity</th>
                    <th>Subjectivity</th>
                    <th>Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row[textColumn]}</td>
                      <td>{row.polarity.toFixed(2)}</td>
                      <td>{row.subjectivity.toFixed(2)}</td>
                      <td>{row.sentiment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button onClick={resetForm} className="reset-button">
              Analyze Another File
            </button>
          </div>
        )}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentNLP;
