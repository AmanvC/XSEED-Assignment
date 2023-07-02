const Question = require("../models/Question");

module.exports.createQuestion = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.question) {
      return res.status(400).json({
        success: false,
        message: "Question field is required.",
      });
    }
    const newQuestion = await Question.create(req.body);
    const updatedQuestion = await Question.findById(newQuestion.id)
      .populate("user", "studentName email")
      .populate("chapter");
    return res.status(200).json({
      success: true,
      data: updatedQuestion,
    });
  } catch (err) {
    console.log(err);
    console.log("Error in creating a question.");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

module.exports.getAllQuestions = async (req, res) => {
  try {
    const chId = req.params.id;
    const allQuestions = await Question.find({ chapter: chId })
      .populate("user", "studentName email")
      .populate("chapter");
    return res.status(200).json({
      success: true,
      data: allQuestions,
    });
  } catch (err) {
    console.log(err);
    console.log("Error in getting all questions.");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
