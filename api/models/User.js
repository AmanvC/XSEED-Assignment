const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    schoolCode: {
      type: String,
      required: true,
    },
    schoolAccessKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
