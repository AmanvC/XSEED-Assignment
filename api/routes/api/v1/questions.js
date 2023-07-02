const express = require("express");
const router = express.Router();
const questionsController = require("../../../controllers/questionsController");

router.get("/:id", questionsController.getAllQuestions);
router.post("/create", questionsController.createQuestion);

module.exports = router;
