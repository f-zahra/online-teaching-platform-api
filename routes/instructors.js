const express = require("express");
const { validateToken, authorize } = require("../middleware/protect");
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
router
  .route("/:id/photo")
  .put(validateToken, authorize("admin", "publisher"), instructorPhotoUpload);
router
  .route("/")
  .get(advancedResult(InstructorModel), getInstructors)
  .post(validateToken, authorize("admin", "publisher"), addInstructor);
router
  .route("/:id")
  .get(getInstructorById)
  .put(validateToken, authorize("publisher", "admin"), updateInstructor)
  .delete(validateToken, authorize("admin"), deleteInstructor);

module.exports = router;
