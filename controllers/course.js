//imports
const Course = require("../models/Course");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Instructor = require("../models/Instructor");

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

  //server response
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

//get single course
exports.getCourse = asyncHandler(async (req, res, next) => {
  //execute query
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(
        400,
        `Course with the id ${req.params.id} was not found`
      )
    );
  }

  //server response
  res.status(200).json({
    success: true,
    data: course,
  });
});

// add course
exports.addCourse = asyncHandler(async (req, res, next) => {
  //get the instructor path ref from the req param
  req.body.instructor = req.params.instructorId;

  //find the instructor
  const instructor = Instructor.findById(req.params.instructorId);

  if (!instructor) {
    return next(
      new ErrorResponse(
        400,
        `Instructor with id ${req.params.instructorId} does not exist`
      )
    );
  }
  //create the course
  const course = await Course.create(req.body);

  //server response
  res.status(201).json({
    success: true,
    data: course,
  });
});

//update course
exports.updateCourse = asyncHandler(async (req, res, next) => {
  //find course
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(
      new ErrorResponse(
        400,
        `course with the id ${req.params.id} was not found`
      )
    );
  }

  //server response
  res.status(200).json({
    success: true,
    data: course,
  });
});

// delete course
