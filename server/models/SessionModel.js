const { pool } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const SessionModel = {
  // Create a new anonymous session
  async create(displayName) {
    const id = uuidv4();
    await pool.query(
      "INSERT INTO user_sessions (id, display_name) VALUES (?, ?)",
      [id, displayName || "Explorer"]
    );
    return { id, displayName: displayName || "Explorer" };
  },

  // Get an existing session by ID
  async getById(sessionId) {
    const [rows] = await pool.query(
      "SELECT id, display_name, created_at, last_active FROM user_sessions WHERE id = ?",
      [sessionId]
    );
    return rows[0] || null;
  },

  // Update last active timestamp
  async touch(sessionId) {
    await pool.query(
      "UPDATE user_sessions SET last_active = CURRENT_TIMESTAMP WHERE id = ?",
      [sessionId]
    );
  },
};

module.exports = SessionModel;
