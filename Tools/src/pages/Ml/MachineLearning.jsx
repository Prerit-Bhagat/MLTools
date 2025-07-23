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
// ML.js
import React, { useState } from "react";
import axios from "axios";
import "./ML.css";

const ML = () => {
  const [file, setFile] = useState(null);
  const [targetVariable, setTargetVariable] = useState("");
  const [problemType, setProblemType] = useState("classification");
  const [weights, setWeights] = useState("");
  const [impacts, setImpacts] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!file || !targetVariable || !weights || !impacts) {
      setError("Please select a file and fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("target_var", targetVariable);
    formData.append("problem_type", problemType);
    formData.append("weights", weights);
    formData.append("impacts", impacts);

    try {
      const response = await axios.post(
        "https://mltools.onrender.com/automl/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="ml-page">
      <div className="ml-card">
        {!result ? (
          <>
            <h2 className="ml-heading">Upload CSV & Find Best Model</h2>
            <form onSubmit={handleSubmit} className="ml-form">
              <label className="file-label">
                Choose CSV File
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>

              <input
                type="text"
                placeholder="Target Variable"
                value={targetVariable}
                onChange={(e) => setTargetVariable(e.target.value)}
              />

              <select
                value={problemType}
                onChange={(e) => setProblemType(e.target.value)}
              >
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
              </select>

              <input
                type="text"
                placeholder="Weights (comma-separated)"
                value={weights}
                onChange={(e) => setWeights(e.target.value)}
              />

              <input
                type="text"
                placeholder="Impacts (+ or -, comma-separated)"
                value={impacts}
                onChange={(e) => setImpacts(e.target.value)}
              />

              <button type="submit" className="ml-button">
                Run Analysis
              </button>
            </form>
          </>
        ) : (
          <div className="results">
            <h3 className="ml-heading">Best Model: {result.best_model_name}</h3>
            {result.metrics && Object.keys(result.metrics).length > 0 ? (
              <ul className="ml-metrics">
                {Object.entries(result.metrics).map(([key, val]) => (
                  <li key={key}>
                    <span className="metric-key">{key}:</span> {val}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-metrics">No metrics available.</p>
            )}
            <button onClick={() => setResult(null)} className="ml-button mt-4">
              Upload Another
            </button>
          </div>
        )}
        {error && <p className="ml-error">{error}</p>}
      </div>
    </div>
  );
};

export default ML;
