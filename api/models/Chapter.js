const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    standard: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      enum: ["Hindi", "English", "Science", "Maths", "Social Science"],
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    lesson: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
      },
    ],
    videos: [{ type: String }],
    images: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
