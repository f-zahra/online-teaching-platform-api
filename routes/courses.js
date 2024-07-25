const express = require("express");
const { validateToken, authorize } = require("../middleware/protect");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");

//import advancedResult middleware
const advancedResult = require("../middleware/advancedResult");
const CourseModel = require("../models/Course");
//route /v1/instructors/:instructorId/courses
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(
    validateToken,
    advancedResult(CourseModel, {
      path: "instructor",
      select: "name expertise",
    }),
    getCourses
  )
  .post(validateToken, authorize("publisher", "admin"), addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(validateToken, authorize("publisher", "admin"), updateCourse)
  .delete(validateToken, authorize("publisher", "admin"), deleteCourse);
module.exports = router;
