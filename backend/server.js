const express = require("express");
const validateUrl = require("./utils/validateUrl");
const fetchPage = require("./services/fetchPage");

const app = express();
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

    res.json({
      message: "Page fetched successfully",
      statusCode: page.statusCode,
      responseTime: page.responseTime
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