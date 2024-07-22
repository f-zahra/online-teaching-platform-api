const express = require("express");
const { userRegistration } = require("../controllers/auth");

const router = express.Router();

router.route("/user-registration").post(userRegistration);

module.exports = router;
