const express = require("express");
const validateUrl = require("./utils/validateUrl");

const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Page Pulse Backend Running");
});

// Audit route
app.post("/audit", (req, res) => {
  const { url } = req.body;

  if (!validateUrl(url)) {
    return res.status(400).json({
      error: "Please provide a valid HTTP or HTTPS URL."
    });
  }

  res.json({
    message: "Audit request received",
    url
  });
});

// Port configuration
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});