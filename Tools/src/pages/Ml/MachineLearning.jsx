import React, { useState } from "react";
import axios from "axios";

const ML = () => {
    const [file, setFile] = useState(null);
    const [targetVariable, setTargetVariable] = useState("");
    const [problemType, setProblemType] = useState("classification");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);

        if (!file || !targetVariable) {
            setError("Please select a file and enter a target variable.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("target_variable", targetVariable);
        formData.append("problem_type", problemType);

        try {
            const response = await axios.post("http://127.0.0.1:8000/automl/", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setResult(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong.");
        }
    };

    return (
        <div>
            <h2>Upload CSV & Find Best Model</h2>
            {!result ? (
                <form onSubmit={handleSubmit}>
                    <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
                    <input type="text" placeholder="Target Variable" value={targetVariable} onChange={(e) => setTargetVariable(e.target.value)} />
                    <select value={problemType} onChange={(e) => setProblemType(e.target.value)}>
                        <option value="classification">Classification</option>
                        <option value="regression">Regression</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <h3>Best Model Found</h3>
                    <p><strong>Model:</strong> {result.best_model_name}</p>
                    <h4>Performance Metrics:</h4>
                    <ul>
                        {Object.entries(result.metrics).map(([key, value]) => (
                            <li key={key}>{key}: {value}</li>
                        ))}
                    </ul>
                    <button onClick={() => setResult(null)}>Upload Another File</button>
                </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ML;
