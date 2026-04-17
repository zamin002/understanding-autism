const ModuleModel = require("../models/ModuleModel");

const moduleController = {
  // GET /api/modules : list all learning modules
  async getAllModules(req, res) {
    try {
      const modules = await ModuleModel.getAll();
      res.json(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  },

  // GET /api/modules/:slug : get a single module with its content pages
  async getModule(req, res) {
    try {
      const mod = await ModuleModel.getBySlug(req.params.slug);
      if (!mod) {
        return res.status(404).json({ error: "Module not found" });
      }
      const pages = await ModuleModel.getContentPages(mod.id);
      res.json({ ...mod, pages });
    } catch (error) {
      console.error("Error fetching module:", error);
      res.status(500).json({ error: "Failed to fetch module" });
    }
  },
};

module.exports = moduleController;
