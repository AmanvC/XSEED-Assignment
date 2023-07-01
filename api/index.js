const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT;
const passportJWT = require("./config/passport_jwt_strategy");
const db = require("./config/mongoose");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in starting the express server: ${err}`);
    return;
  }
  console.log(`Server is running on port: ${port}`);
});
