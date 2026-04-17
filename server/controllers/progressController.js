const ProgressModel = require("../models/ProgressModel");

const progressController = {
  // GET /api/progress/:sessionId – get all progress for a session
  async getProgress(req, res) {
    try {
      const progress = await ProgressModel.getBySession(req.params.sessionId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  },

  // POST /api/progress – update progress for a module
  async updateProgress(req, res) {
    try {
      const { sessionId, moduleId, status, score } = req.body;

      if (!sessionId || !moduleId || !status) {
        return res.status(400).json({ error: "sessionId, moduleId, and status are required" });
      }

      // score is optional but if provided it must be a non negative number
      if (score !== undefined && (typeof score !== "number" || score < 0)) {
        return res.status(400).json({ error: "Invalid score" });
      }

      const validStatuses = ["not_started", "in_progress", "completed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      await ProgressModel.upsert(sessionId, moduleId, status, score);
      res.json({ message: "Progress updated" });
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ error: "Failed to update progress" });
    }
  },
};

module.exports = progressController;
