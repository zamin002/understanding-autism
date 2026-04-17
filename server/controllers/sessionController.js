const SessionModel = require("../models/SessionModel");

const sessionController = {
  // POST /api/sessions – create a new anonymous session
  async createSession(req, res) {
    try {
      const { displayName } = req.body;

      // someone could send a 10MB string as the name so reject it early since it could cause problems to database
      if (displayName && displayName.length > 50) {
        return res.status(400).json({ error: "Display name too long" });
      }

      const session = await SessionModel.create(displayName);
      res.status(201).json(session);
    } catch (error) {
      console.error("Error creating session:", error);
      res.status(500).json({ error: "Failed to create session" });
    }
  },

  // GET /api/sessions/:id – get session info
  async getSession(req, res) {
    try {
      const session = await SessionModel.getById(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      await SessionModel.touch(req.params.id);
      res.json(session);
    } catch (error) {
      console.error("Error fetching session:", error);
      res.status(500).json({ error: "Failed to fetch session" });
    }
  },
};

module.exports = sessionController;
