const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const registeredUser = await User.findOne({ email: req.body.email });
    if (registeredUser) {
      return res.status(403).json({
        success: false,
        message:
          "User with given email ID already exists, please login to continue.",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    await User.create({
      ...req.body,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully.Please login to continue.",
    });
  } catch (err) {
    console.log(err);
    console.log("Error in registering a new user.");
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

module.exports.createSession = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({ email: data.email }).lean();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist!",
      });
    }
    const checkPassword = await bcrypt.compare(data.password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password!",
      });
    }
    const { password, ...otherData } = user;
    return res.status(200).json({
      success: true,
      token: jwt.sign(otherData, process.env.JWT_KEY),
      status: user.status,
    });
  } catch (err) {
    console.log(err);
    console.log("Error in logging in user.");
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
