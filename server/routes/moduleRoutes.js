const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");

// GET /api/modules – list all modules
router.get("/", moduleController.getAllModules);

// GET /api/modules/:slug – get one module with content pages
router.get("/:slug", moduleController.getModule);

module.exports = router;
