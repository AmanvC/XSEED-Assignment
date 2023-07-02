const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const passport = require("passport");
const passportJWT = require("./config/passport_jwt_strategy");
const db = require("./config/mongoose");

const User = require("./models/User");
const Chapter = require("./models/Chapter");
const Lesson = require("./models/Lesson");
const Question = require("./models/Question");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in starting the express server: ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
});
