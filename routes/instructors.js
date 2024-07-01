const express = require("express");
const {
  getInstructors,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/instructors");
const router = express.Router();

router.route("/").get(getInstructors).post(addInstructor);
router.route("/:id").put(updateInstructor).delete(deleteInstructor);

router.route;
module.exports = router;
