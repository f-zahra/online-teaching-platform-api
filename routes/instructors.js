const express = require("express");
const {
  getInstructors,
  getInstructorById,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/instructors");

//import course router
const courseRouter = require("./courses");
const router = express.Router();

//re-route into course router
router.use("/:instructorId/courses", courseRouter);

router.route("/").get(getInstructors).post(addInstructor);
router
  .route("/:id")
  .get(getInstructorById)
  .put(updateInstructor)
  .delete(deleteInstructor);

module.exports = router;
