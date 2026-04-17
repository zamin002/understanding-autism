const { pool } = require("../config/db");

const ProgressModel = {
  // Get all progress records for a session
  async getBySession(sessionId) {
    const [rows] = await pool.query(
      `SELECT mp.module_id, m.title, m.slug, mp.status, mp.score, mp.updated_at
       FROM module_progress mp
       JOIN modules m ON mp.module_id = m.id
       WHERE mp.session_id = ?
       ORDER BY m.sort_order`,
      [sessionId]
    );
    return rows;
  },

  // Update or create progress for a module
  async upsert(sessionId, moduleId, status, score) {
    await pool.query(
      `INSERT INTO module_progress (session_id, module_id, status, score)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE status = VALUES(status), score = VALUES(score)`,
      [sessionId, moduleId, status, score || 0]
    );
  },

  // Get progress for a specific module
  async getModuleProgress(sessionId, moduleId) {
    const [rows] = await pool.query(
      "SELECT status, score FROM module_progress WHERE session_id = ? AND module_id = ?",
      [sessionId, moduleId]
    );
    return rows[0] || { status: "not_started", score: 0 };
  },
};

module.exports = ProgressModel;
