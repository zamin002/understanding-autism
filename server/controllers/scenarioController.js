const ScenarioModel = require("../models/ScenarioModel");

const scenarioController = {
  // GET /api/scenarios/module/:moduleId – get scenarios for a module
  async getByModule(req, res) {
    try {
      const scenarios = await ScenarioModel.getByModule(req.params.moduleId);
      res.json(scenarios);
    } catch (error) {
      console.error("Error fetching scenarios:", error);
      res.status(500).json({ error: "Failed to fetch scenarios" });
    }
  },

  // GET /api/scenarios/:id/choices – get choices for a scenario
  async getChoices(req, res) {
    try {
      const choices = await ScenarioModel.getChoices(req.params.id);
      res.json(choices);
    } catch (error) {
      console.error("Error fetching choices:", error);
      res.status(500).json({ error: "Failed to fetch choices" });
    }
  },

  // POST /api/scenarios/attempt – record an attempt
  async recordAttempt(req, res) {
    try {
      const { sessionId, scenarioId, choiceId } = req.body;

      if (!sessionId || !scenarioId) {
        return res.status(400).json({ error: "sessionId and scenarioId are required" });
      }

      const attemptId = await ScenarioModel.recordAttempt(sessionId, scenarioId, choiceId);
      res.status(201).json({ attemptId });
    } catch (error) {
      console.error("Error recording attempt:", error);
      res.status(500).json({ error: "Failed to record attempt" });
    }
  },
};

module.exports = scenarioController;
