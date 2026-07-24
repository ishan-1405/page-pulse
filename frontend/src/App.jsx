import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError("Please enter a valid website URL.");
      setReport(null);
      return;
    }

    setLoading(true);
    setError("");
    setReport(null);

    try {
      const response = await fetch("http://localhost:3000/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to analyze website.");
      }

      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const metrics = report
    ? [
        { label: "HTTP Status", value: report.statusCode, tone: "accent" },
        { label: "Response Time", value: `${report.responseTime} ms`, tone: "accent" },
        { label: "Page Title", value: report.title || "Not Available", tone: "neutral" },
        { label: "Meta Description", value: report.metaDescription || "Not Available", tone: "neutral" },
        { label: "H1 Count", value: report.h1Count, tone: "accent" },
        { label: "Images Missing Alt", value: report.imagesMissingAlt, tone: "warning" },
        { label: "Word Count", value: report.wordCount, tone: "accent" },
      ]
    : [];

  return (
    <div className="page-shell">
      <main className="dashboard-card">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">DIGITAL HEROES • INTERNSHIP PROJECT</span>
            <h1>Page Pulse</h1>
            <p>
              Audit any webpage with the polish of a premium SaaS platform.
              Review speed, structure, accessibility, and SEO signals in one elegant workflow.
            </p>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="orb orb-one"></div>
            <div className="orb orb-two"></div>
            <div className="panel-card">
              <span>Live Audit</span>
              <strong>Instant insights</strong>
            </div>
          </div>
        </section>

        <section className="input-panel">
          <label htmlFor="website-url">Website URL</label>
          <div className="input-row">
            <input
              id="website-url"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Website"}
            </button>
          </div>
        </section>

        {loading && (
          <section className="status-card loading-card">
            <div className="loader"></div>
            <h3>Analyzing Website...</h3>
            <p>Fetching HTML, extracting metadata, and preparing your report.</p>
          </section>
        )}

        {error && (
          <section className="status-card error-card">
            <strong>Audit Error</strong>
            <p>{error}</p>
          </section>
        )}

        {report && (
          <section className="report-card">
            <div className="report-header">
              <div>
                <span className="section-tag">PAGE ANALYSIS</span>
                <h2>Analysis Report</h2>
              </div>
              <div className={`status-pill ${report.statusCode === 200 ? "success" : "danger"}`}>
                HTTP {report.statusCode}
              </div>
            </div>

            <div className="metrics-grid">
              {metrics.map((item) => (
                <div className={`metric-card ${item.tone}`} key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer>
        Built for <a href="https://digitalheroesco.com" target="_blank" rel="noreferrer">Digital Heroes Training Task</a>
      </footer>
    </div>
  );
}

export default App;