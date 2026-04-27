const { pool } = require("../config/db");

const ScenarioModel = {
  // Get all scenarios for a module, with choices embedded
  async getByModule(moduleId) {
    const [rows] = await pool.query(
      `SELECT s.id AS scenario_id, s.intro_text, s.explanation, s.scenario_order,
              sc.id AS choice_id, sc.choice_text, sc.is_correct, sc.choice_order
       FROM scenarios s
       LEFT JOIN scenario_choices sc ON sc.scenario_id = s.id
       WHERE s.module_id = ?
       ORDER BY s.scenario_order, sc.choice_order`,
      [moduleId]
    );

    const scenarioMap = new Map();
    for (const row of rows) {
      if (!scenarioMap.has(row.scenario_id)) {
        scenarioMap.set(row.scenario_id, {
          id: row.scenario_id,
          intro_text: row.intro_text,
          explanation: row.explanation,
          scenario_order: row.scenario_order,
          choices: [],
        });
      }
      if (row.choice_id) {
        scenarioMap.get(row.scenario_id).choices.push({
          id: row.choice_id,
          choice_text: row.choice_text,
          is_correct: !!row.is_correct,
          choice_order: row.choice_order,
        });
      }
    }
    return Array.from(scenarioMap.values());
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
