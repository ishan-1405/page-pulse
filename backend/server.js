const express = require("express");
const validateUrl = require("./utils/validateUrl");
const fetchPage = require("./services/fetchPage");
const auditPage = require("./parsers/auditPage");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Page Pulse Backend Running");
});

// Audit route
app.post("/audit", async (req, res) => {
    const { url } = req.body;

    if (!validateUrl(url)) {
        return res.status(400).json({
            error: "Please provide a valid HTTP or HTTPS URL."
        });
    }

    try {
        const page = await fetchPage(url);
        const report = auditPage(page.html);

        res.json({
            statusCode: page.statusCode,
            responseTime: page.responseTime,
            title: report.title,
            metaDescription: report.metaDescription,
            h1Count: report.h1Count,
            imagesMissingAlt: report.imagesMissingAltText,
            wordCount: report.wordCount
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message,
            responseTime: error.responseTime
        });
    }
});

// Port configuration
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});