const express = require("express");
const validateToken = require("../middleware/tokenValidation");

const {
  userRegistration,
  userLogin,
  currentLoggedUser,
} = require("../controllers/auth");

const router = express.Router();

router.route("/user-registration").post(userRegistration);
router.route("/login").post(userLogin);
router.route("/auth").get(validateToken, currentLoggedUser);
module.exports = router;
