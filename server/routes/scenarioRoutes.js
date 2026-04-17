const express = require("express");
const router = express.Router();
const scenarioController = require("../controllers/scenarioController");

// GET /api/scenarios/module/:moduleId – scenarios for a module
router.get("/module/:moduleId", scenarioController.getByModule);

// GET /api/scenarios/:id/choices – choices for a scenario
router.get("/:id/choices", scenarioController.getChoices);

// POST /api/scenarios/attempt – record a scenario attempt
router.post("/attempt", scenarioController.recordAttempt);

module.exports = router;
