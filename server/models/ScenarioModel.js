const { pool } = require("../config/db");

const ScenarioModel = {
  // Get all scenarios for a module
  async getByModule(moduleId) {
    const [rows] = await pool.query(
      "SELECT id, title, intro_text, scenario_order FROM scenarios WHERE module_id = ? ORDER BY scenario_order",
      [moduleId]
    );
    return rows;
  },

  // Get choices for a scenario
  async getChoices(scenarioId) {
    const [rows] = await pool.query(
      `SELECT sc.id, sc.choice_text, sc.is_correct, sc.choice_order,
              f.message AS feedback_message, f.is_positive AS feedback_positive
       FROM scenario_choices sc
       LEFT JOIN feedback f ON f.choice_id = sc.id
       WHERE sc.scenario_id = ?
       ORDER BY sc.choice_order`,
      [scenarioId]
    );
    return rows;
  },

  // Record an attempt
  async recordAttempt(sessionId, scenarioId, choiceId) {
    const [result] = await pool.query(
      "INSERT INTO scenario_attempts (session_id, scenario_id, choice_id, is_completed) VALUES (?, ?, ?, TRUE)",
      [sessionId, scenarioId, choiceId]
    );
    return result.insertId;
  },
};

module.exports = ScenarioModel;
