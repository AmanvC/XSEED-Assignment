const Chapter = require("../models/Chapter");

module.exports.getChapterDetails = async (req, res) => {
  try {
    const chapter = await Chapter.findOne().populate("lesson");
    return res.status(200).json({
      success: true,
      data: chapter,
    });
  } catch (err) {
    console.log(err);
    console.log("Error in getting chapter details.");
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
