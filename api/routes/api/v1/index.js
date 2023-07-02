const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/chapters", require("./chapters"));

module.exports = router;
