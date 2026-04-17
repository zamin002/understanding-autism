const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

// POST /api/sessions – create a new session
router.post("/", sessionController.createSession);

// GET /api/sessions/:id – get session details
router.get("/:id", sessionController.getSession);

module.exports = router;
