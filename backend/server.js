const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config(); // Load .env variables

const app = express();
app.use(cors());
app.use(express.json());

const FLASK_URL = process.env.FLASK_URL || "http://localhost:5001";

// 🚀 POST /api/predict (Proxy to Flask)
app.post("/api/predict", async (req, res) => {
  try {
    const response = await axios.post(`${FLASK_URL}/predict`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Error from Flask:", err.message);
    res.status(500).json({ error: "Flask service failed." });
  }
});

// 🔊 Start Express
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🟢 Express server running on port ${PORT}`));
