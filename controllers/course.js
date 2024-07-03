//imports
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//get all courses
exports.getCourses = asyncHandler(async (req, res) => {
  //finding resources
  let query;
  //get courses per instructor
  if (req.params.instructorId) {
    query = Course.find({ instructor: req.params.instructorId });
  } else {
    query = Course.find().populate({
      path: "instructor",
      select: "name expertise",
    });
  }

  //execute query
  const courses = await query;

  //handle error if not found
  if (!courses) {
    return next(new ErrorResponse(400, ` oopsie`));
  }

  //server response
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

//get single course
