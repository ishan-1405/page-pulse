const express = require("express");

const app = express();

// Home route
app.get("/", (req, res) => {
  res.send("Page Pulse Backend Running");
});

// Port configuration
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});