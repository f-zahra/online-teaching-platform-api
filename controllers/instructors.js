const Instructor = require("../models/Instructor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

//get all instructors
exports.getInstructors = asyncHandler(async (req, res) => {
  const instructors = await Instructor.find();

  res.status(200).json({
    success: true,
    count: instructors.length,
    data: instructors,
  });
});

//get instructor by id
exports.getInstructorById = asyncHandler(async (req, res, next) => {
  const instructor = await Instructor.findById(req.params.id);

  if (!instructor) {
    return next(
      new ErrorResponse(400, `Instructor with id ${req.params.id}was not found`)
    );
  }
  res.status(200).json({
    success: true,

    data: instructor,
  });
});

//create a instructor
exports.addInstructor = asyncHandler(async (req, res, next) => {
  //insert data

  const instructor = await Instructor.create(req.body);

  res.status(201).json({ success: true, data: instructor });
});

//update instructor by id
exports.updateInstructor = asyncHandler(async (req, res, next) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!instructor) {
      return next(
        new ErrorResponse(
          400,
          `Instructor with id ${req.params.id}was not found`
        )
      );
    }
    res.status(200).json({ success: true, data: instructor });
  } catch (error) {
    next(error);
  }
});

//delete instructor by id
exports.deleteInstructor = asyncHandler(async (req, res, next) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);

    if (!instructor) {
      return next(
        new ErrorResponse(
          400,
          `Instructor with id ${req.params.id}was not found`
        )
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});
