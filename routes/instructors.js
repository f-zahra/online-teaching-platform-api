const express = require("express");
const {
  getInstructors,
  getInstructorById,
  addInstructor,
  updateInstructor,
  deleteInstructor,
  instructorPhotoUpload,
} = require("../controllers/instructors");

//import course router
const courseRouter = require("./courses");
const router = express.Router();

//import instructor model
const InstructorModel = require("../models/Instructor");
//import advancedResult middleware
const advancedResult = require("../middleware/advancedResult");
//re-route into course router
router.use("/:instructorId/courses", courseRouter);
router.route("/:id/photo").put(instructorPhotoUpload);
router
  .route("/")
  .get(advancedResult(InstructorModel), getInstructors)
  .post(addInstructor);
router
  .route("/:id")
  .get(getInstructorById)
  .put(updateInstructor)
  .delete(deleteInstructor);

module.exports = router;
