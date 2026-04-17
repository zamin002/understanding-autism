const { pool } = require("../config/db");

const ModuleModel = {
  // Get all modules ordered by sort_order
  async getAll() {
    const [rows] = await pool.query(
      "SELECT id, title, slug, description, icon, sort_order FROM modules ORDER BY sort_order"
    );
    return rows;
  },

  // Get a single module by its slug (used in URL routing)
  async getBySlug(slug) {
    const [rows] = await pool.query(
      "SELECT id, title, slug, description, icon FROM modules WHERE slug = ?",
      [slug]
    );
    return rows[0] || null;
  },

  // Get content pages for a specific module
  async getContentPages(moduleId) {
    const [rows] = await pool.query(
      "SELECT id, title, body, page_order, image_url FROM content_pages WHERE module_id = ? ORDER BY page_order",
      [moduleId]
    );
    return rows;
  },
};

module.exports = ModuleModel;
