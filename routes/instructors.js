const express = require("express");
const {
  getInstructors,
  getInstructorById,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/instructors");
const router = express.Router();

router.route("/").get(getInstructors).post(addInstructor);
router
  .route("/:id")
  .get(getInstructorById)
  .put(updateInstructor)
  .delete(deleteInstructor);

module.exports = router;
