const express = require("express");
const { userRegistration, userLogin } = require("../controllers/auth");

const router = express.Router();

router.route("/user-registration").post(userRegistration);
router.route("/login").post(userLogin);
module.exports = router;
