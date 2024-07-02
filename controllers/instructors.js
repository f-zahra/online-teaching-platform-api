const Instructor = require("../models/Instructor");
const ErrorResponse = require("../utils/errorResponse");

//get all
exports.getInstructors = async (req, res) => {
  const instructors = await Instructor.find();

  res.status(200).json({
    success: true,
    count: instructors.length,
    data: instructors,
  });
};

//get by id
exports.getInstructorById = async (req, res, next) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return next(
        new ErrorResponse(
          400,
          `Instructor with id ${req.params.id}was not found`
        )
      );
    }
    res.status(200).json({
      success: true,

      data: instructor,
    });
  } catch (error) {
    next(error);
  }
};

//create a instructor
exports.addInstructor = async (req, res, next) => {
  //insert data
  try {
    const instructor = await Instructor.create(req.body);

    res.status(201).json({ success: true, data: instructor });
  } catch (error) {
    next(error);
  }
};

exports.updateInstructor = async (req, res, next) => {
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
};

exports.deleteInstructor = async (req, res, next) => {
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
};
