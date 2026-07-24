const express = require("express");

const app = express();
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Page Pulse Backend Running");
});

// Audit route
app.post("/audit", (req, res) => {
  const { url } = req.body;
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