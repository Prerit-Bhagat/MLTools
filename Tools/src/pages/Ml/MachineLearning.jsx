import React, { useState } from "react";
import axios from "axios";
import "./ML.css"; // Import CSS

const ML = () => {
    const [file, setFile] = useState(null);
    const [targetVariable, setTargetVariable] = useState("");
    const [problemType, setProblemType] = useState("classification");
    const [weights, setWeights] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); //  Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);
        setLoading(true);

        // Debugging Logs
        console.log("File:", file);
        console.log("Target Variable:", targetVariable);
        console.log("Problem Type:", problemType);
        console.log("Weights:", weights);

        if (!file || !targetVariable.trim() || !weights.trim()) {
            setError("Please select a file and enter all required fields.");
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("target_variable", targetVariable);
        formData.append("problem_type", problemType);
        formData.append("weights", weights);

        try {
            const response = await axios.post("https://mltools.onrender.com/automl/", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("API Response:", response.data);
            setResult(response.data);
        } catch (err) {
            console.error("API Error:", err.response?.data || err);
            setError(err.response?.data?.error || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ml-container">
            <div className="ml-header">
                <h1>Upload Your CSV & Discover the Best Model Using Topsis</h1>
                <p>Simply upload your dataset, specify the target variable, select the problem type, and set the weights. Our system will analyze your data and find the most suitable machine learning model for you!</p>
            </div>
            <div className="centre">
                <div className="left">
                        <h1>Impacts For Topsis</h1>
                        <div className="impacts-container">
                            <div className="impacts-column">
                                <p>MAE</p>
                                <p>MSE</p>
                                <p>RMSE</p>
                                <p>R²</p>
                                <p>RMSLE</p>
                                <p>MAPE</p>
                                <p>TT (Sec)</p>
                            </div>
                            <div className="impacts-column">
                                <p>-</p>
                                <p>-</p>
                                <p>-</p>
                                <p>+</p>
                                <p>-</p>
                                <p>-</p>
                                <p>-</p>
                        </div>
                    </div>
                </div>
                    <div className="ml-box">
                        <h2>Upload CSV & Find Best Model</h2>

                        {loading && <div className="spinner"></div>} {/*  Show loading spinner */}

                        {!result ? (
                            <form onSubmit={handleSubmit}>
                                <input 
                                    type="file" 
                                    accept=".csv" 
                                    onChange={(e) => {
                                        console.log("Selected File:", e.target.files[0]); //  Debugging line
                                        setFile(e.target.files[0]);
                                    }} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Target Variable" 
                                    value={targetVariable} 
                                    onChange={(e) => setTargetVariable(e.target.value)}
                                />
                                <select value={problemType} onChange={(e) => setProblemType(e.target.value)}>
                                    <option value="classification">Classification</option>
                                    <option value="regression">Regression</option>
                                </select>
                                <input 
                                    type="text" 
                                    placeholder="Weights (comma-separated)" 
                                    value={weights} 
                                    onChange={(e) => setWeights(e.target.value)}
                                />
                                <button type="submit" disabled={loading}>
                                    {loading ? "Processing..." : "Submit"}
                                </button>
                            </form>
                        ) : (
                            <div>
                                <h3>Best Model Found</h3>
                                <p><strong>Model:</strong> {result.best_model_name}</p>
                                <h4>Performance Metrics:</h4>
                                {result?.metrics && Object.keys(result.metrics).length > 0 ? (
                                    <ul className="ml-metrics">
                                        {Object.entries(result.metrics).map(([key, value]) => (
                                            <li key={key}>{key}: {value}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No metrics available.</p>
                                )}
                                <button onClick={() => setResult(null)}>Upload Another File</button>
                            </div>
                        )}
                        {error && <p className="ml-error">{error}</p>}
                    </div>
                    <div className="right">
                        <h1>Impacts For Topsis</h1>
                        <div className="impacts-container">
                            <div className="impacts-column">
                                <p>Accuracy</p>
                                <p>AUC</p>
                                <p>Recall</p>
                                <p>Precision</p>
                                <p>F1</p>
                                <p>Kappa</p>
                                <p>MCC</p>
                                <p>TT (Sec)</p>
                            </div>
                            <div className="impacts-column">
                                <p>+</p>
                                <p>+</p>
                                <p>+</p>
                                <p>+</p>
                                <p>+</p>
                                <p>+</p>
                                <p>+</p>
                                <p>-</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ML;
