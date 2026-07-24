import { useState } from "react";
import "./App.css";

function App() {

  const [url, setUrl] = useState("");

  const [report, setReport] = useState(null);
  const handleAnalyze = async () => {
  try {
    const response = await fetch("http://localhost:3000/audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();
    setReport(data);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="container">
      <h1>Page Pulse</h1>

      <input
  type="text"
  placeholder="Enter website URL"
  value={url}
  onChange={(e) => setUrl(e.target.value)}
/>

      <button onClick={handleAnalyze}>
        Analyze
      </button>
      {report && (
      <div>
        <h2>Audit Report</h2>

        <p><strong>Status:</strong> {report.statusCode}</p>
        <p><strong>Response Time:</strong> {report.responseTime} ms</p>
        <p><strong>Title:</strong> {report.title}</p>
        <p><strong>Meta Description:</strong> {report.metaDescription || "None"}</p>
        <p><strong>H1 Count:</strong> {report.h1Count}</p>
        <p><strong>Images Missing Alt:</strong> {report.imagesMissingAlt}</p>
        <p><strong>Word Count:</strong> {report.wordCount}</p>
      </div>
)}
    </div>
  );
}

export default App;