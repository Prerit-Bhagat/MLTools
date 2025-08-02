// import React, { useState } from "react";
// import axios from "axios";
// import "./ML.css"; // Import CSS

// const ML = () => {
//   const [file, setFile] = useState(null);
//   const [targetVariable, setTargetVariable] = useState("");
//   const [problemType, setProblemType] = useState("classification");
//   const [weights, setWeights] = useState("");
//   const [impacts, setImpacts] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setResult(null);

//     if (!file || !targetVariable || !weights || !impacts) {
//       setError("Please select a file and enter all required fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("target_var", targetVariable);
//     formData.append("problem_type", problemType);
//     formData.append("weights", weights);
//     formData.append("impacts", impacts);

//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value);
//     }

//     try {
//       const response = await axios.post(
//         "https://mltools.onrender.com/automl/",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       console.log("API Response:", response.data);
//       setResult(response.data);
//     } catch (err) {
//       console.error("API Error:", err.response?.data || err);
//       setError(err.response?.data?.error || "Something went wrong.");
//     }
//   };

//   return (
//     <div className="ml-container">
//       <div className="ml-box">
//         <h2>Upload CSV & Find Best Model</h2>
//         {!result ? (
//           <form onSubmit={handleSubmit}>
//             <input
//               type="file"
//               accept=".csv"
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//             <input
//               type="text"
//               placeholder="Target Variable"
//               value={targetVariable}
//               onChange={(e) => setTargetVariable(e.target.value)}
//             />
//             <select
//               value={problemType}
//               onChange={(e) => setProblemType(e.target.value)}
//             >
//               <option value="classification">Classification</option>
//               <option value="regression">Regression</option>
//             </select>
//             <input
//               type="text"
//               placeholder="Weights (comma-separated)"
//               value={weights}
//               onChange={(e) => setWeights(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Impacts (+ or -, comma-separated)"
//               value={impacts}
//               onChange={(e) => setImpacts(e.target.value)}
//             />
//             <button type="submit">Submit</button>
//           </form>
//         ) : (
//           <div>
//             <h3>Best Model Found</h3>
//             <p>
//               <strong>Model:</strong> {result.best_model_name}
//             </p>
//             <h4>Performance Metrics:</h4>
//             {result?.metrics && Object.keys(result.metrics).length > 0 ? (
//               <ul className="ml-metrics">
//                 {Object.entries(result.metrics).map(([key, value]) => (
//                   <li key={key}>
//                     {key}: {value}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No metrics available.</p>
//             )}
//             <button onClick={() => setResult(null)}>Upload Another File</button>
//           </div>
//         )}
//         {error && <p className="ml-error">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default ML;
import { useState } from "react";
import "./ML.css";

const ML = () => {
  const [file, setFile] = useState(null);
  const [targetVariable, setTargetVariable] = useState("");
  const [problemType, setProblemType] = useState("classification");
  const [weights, setWeights] = useState("");
  const [impacts, setImpacts] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get required number of features based on problem type
  const getRequiredFeatures = () => {
    return problemType === "classification" ? 8 : 7;
  };

  // Generate example weights and impacts
  const generateExample = () => {
    const requiredCount = getRequiredFeatures();
    if (problemType === "classification") {
      setWeights("1,1,1,1,1,1,1,1"); // 8 weights
      setImpacts("+,+,+,+,+,+,+,+"); // 8 impacts
    } else {
      setWeights("1,1,1,1,1,1,1"); // 7 weights
      setImpacts("+,+,+,+,+,+,+"); // 7 impacts
    }
  };

  // Validate weights and impacts format
  const validateInputs = () => {
    const requiredCount = getRequiredFeatures();
    const weightArray = weights.split(",").map((w) => w.trim());
    const impactArray = impacts.split(",").map((i) => i.trim());

    if (weightArray.length !== requiredCount) {
      return `Weights must have exactly ${requiredCount} values for ${problemType}`;
    }

    if (impactArray.length !== requiredCount) {
      return `Impacts must have exactly ${requiredCount} values for ${problemType}`;
    }

    // Validate weights are integers
    for (const weight of weightArray) {
      if (isNaN(Number.parseInt(weight))) {
        return "All weights must be integers";
      }
    }

    // Validate impacts are + or -
    for (const impact of impactArray) {
      if (impact !== "+" && impact !== "-") {
        return "All impacts must be either + or -";
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    // Basic validation
    if (!file || !targetVariable || !weights || !impacts) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Validate format
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("target_var", targetVariable);
    formData.append("problem_type", problemType);
    formData.append("weights", weights);
    formData.append("impacts", impacts);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setFile(null);
    setTargetVariable("");
    setWeights("");
    setImpacts("");
    setError("");
  };

  return (
    <div className="ml-container">
      <div className="ml-header">
        <h1>🧠 ML Model Finder</h1>
        <p>
          Upload your dataset and discover the best machine learning model using
          TOPSIS analysis
        </p>
      </div>

      <div className="ml-box">
        <div className="ml-card-header">
          <h2>Upload CSV & Find Best Model</h2>
        </div>

        <div className="ml-card-content">
          {!result ? (
            <form onSubmit={handleSubmit} className="ml-form">
              {/* File Upload */}
              <div className="form-group">
                <label className="form-label">Dataset (CSV File) *</label>
                <div className="file-upload-area">
                  <div className="upload-icon">📁</div>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="file-input"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="file-label">
                    {file ? (
                      <div className="file-selected">
                        <span className="check-icon">✅</span>
                        <span className="file-name">{file.name}</span>
                      </div>
                    ) : (
                      <div className="file-placeholder">
                        <p className="upload-text">Click to upload CSV file</p>
                        <p className="upload-subtext">or drag and drop</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Target Variable */}
              <div className="form-group">
                <label className="form-label">Target Variable *</label>
                <input
                  type="text"
                  placeholder="e.g., price, category, outcome"
                  value={targetVariable}
                  onChange={(e) => setTargetVariable(e.target.value)}
                  className="form-input"
                />
                <p className="form-help">The column name you want to predict</p>
              </div>

              {/* Problem Type */}
              <div className="form-group">
                <label className="form-label">Problem Type *</label>
                <select
                  value={problemType}
                  onChange={(e) => {
                    setProblemType(e.target.value);
                    setWeights("");
                    setImpacts("");
                  }}
                  className="form-select"
                >
                  <option value="classification">
                    Classification (Categories)
                  </option>
                  <option value="regression">Regression (Numbers)</option>
                </select>
                <p className="form-help">
                  Classification: Predicting categories (spam/not spam, cat/dog)
                  <br />
                  Regression: Predicting numbers (price, temperature, score)
                </p>
              </div>

              {/* Feature Count Info */}
              <div className="info-box">
                <div className="info-icon">ℹ️</div>
                <div>
                  <strong>Required for {problemType}:</strong>
                  <ul>
                    <li>
                      Weights: {getRequiredFeatures()} integer values
                      (comma-separated)
                    </li>
                    <li>
                      Impacts: {getRequiredFeatures()} values of + or -
                      (comma-separated)
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={generateExample}
                    className="example-button"
                  >
                    Generate Example
                  </button>
                </div>
              </div>

              {/* Weights */}
              <div className="form-group">
                <label className="form-label">
                  Weights * (exactly {getRequiredFeatures()} integers)
                </label>
                <input
                  type="text"
                  placeholder={
                    problemType === "classification"
                      ? "e.g., 1,2,1,3,2,1,2,1"
                      : "e.g., 1,2,1,3,2,1,1"
                  }
                  value={weights}
                  onChange={(e) => setWeights(e.target.value)}
                  className="form-input"
                />
                <p className="form-help">
                  Importance weights for each performance metric (integers only)
                </p>
              </div>

              {/* Impacts */}
              <div className="form-group">
                <label className="form-label">
                  Impacts * (exactly {getRequiredFeatures()} values: + or -)
                </label>
                <input
                  type="text"
                  placeholder={
                    problemType === "classification"
                      ? "e.g., +,+,-,+,+,+,-,+"
                      : "e.g., +,+,-,+,+,+,-"
                  }
                  value={impacts}
                  onChange={(e) => setImpacts(e.target.value)}
                  className="form-input"
                />
                <p className="form-help">
                  + means higher is better, - means lower is better
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading
                  ? "🔄 Analyzing Data..."
                  : "📊 Find Best Model with TOPSIS"}
              </button>
            </form>
          ) : (
            // Results Display
            <div className="results-container">
              <div className="success-banner">
                <div className="success-icon">🏆</div>
                <h3>Best Model Found with TOPSIS!</h3>
                <p>
                  <strong>Model:</strong> {result.best_model_name}
                </p>
              </div>

              {/* Performance Metrics */}
              {result?.metrics && Object.keys(result.metrics).length > 0 && (
                <div className="metrics-section">
                  <h4>📊 Performance Metrics & TOPSIS Score</h4>
                  <div className="metrics-grid">
                    {Object.entries(result.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className={`metric-card ${
                          key === "TOPSIS Score" ? "topsis-score" : ""
                        }`}
                      >
                        <div className="metric-label">
                          {key === "TOPSIS Score" ? "🎯 " : ""}
                          {key.replace(/_/g, " ")}
                        </div>
                        <div className="metric-value">
                          {typeof value === "number" ? value.toFixed(4) : value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="info-box">
                <div className="info-icon">💡</div>
                <p>
                  This model was selected using TOPSIS (Technique for Order
                  Preference by Similarity to Ideal Solution) analysis, which
                  considers multiple criteria to find the optimal model for your
                  specific requirements.
                </p>
              </div>

              <button onClick={resetForm} className="reset-button">
                📁 Upload Another File
              </button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ML;
