const express = require("express");
const router = express.Router();
const progressController = require("../controllers/progressController");

// GET /api/progress/:sessionId – get all progress
router.get("/:sessionId", progressController.getProgress);

// POST /api/progress – update progress
router.post("/", progressController.updateProgress);

module.exports = router;
