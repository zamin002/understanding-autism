const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { testConnection } = require("./config/db");
const moduleRoutes = require("./routes/moduleRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const progressRoutes = require("./routes/progressRoutes");
const scenarioRoutes = require("./routes/scenarioRoutes");

const app = express();
const PORT = process.env.PORT;

// general limiter - 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later" },
});

// stricter limiter for session creation since it writes to the database
const sessionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many sessions created, please try again later" },
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/api", generalLimiter);

// Routes
app.use("/api/modules", moduleRoutes);
app.use("/api/sessions", sessionLimiter, sessionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/scenarios", scenarioRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Understanding Autism API is running" });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await testConnection();
});
