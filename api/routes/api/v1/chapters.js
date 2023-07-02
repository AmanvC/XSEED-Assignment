const express = require("express");
const router = express.Router();
const chaptersController = require("../../../controllers/chaptersController");

router.get("/:id", chaptersController.getChapterDetails);

module.exports = router;
