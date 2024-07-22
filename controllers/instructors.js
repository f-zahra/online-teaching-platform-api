const Instructor = require("../models/Instructor");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const path = require("path");

//get all instructors
exports.getInstructors = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResult);
});

//get instructor by id
exports.getInstructorById = asyncHandler(async (req, res, next) => {
  const instructor = await Instructor.findById(req.params.id);
  //log
  console.log(req);
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
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return next(
        new ErrorResponse(
          400,
          `Instructor with id ${req.params.id}was not found`
        )
      );
    }

    await instructor.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});

//upload photo for instructor
// PUT  **/:id/photo
exports.instructorPhotoUpload = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.files);
    //find id of insctructor
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return next(
        new ErrorResponse(
          400,
          `Instructor with id ${req.params.id}was not found`
        )
      );
    }

    const file = req.files.file;
    // Allowed file types
    const fileTypes = /jpeg|jpg|png|gif/;
    const fileName = path.parse(file.name).name.toLowerCase();

    const extName = path.extname(file.name).toLowerCase();
    const isextNameValid = fileTypes.test(extName);
    //check if a file was uploaded in the request
    if (!req.files.file || !isextNameValid) {
      return next(new ErrorResponse(400, "please upload a photo"));
    }

    //add instructor id to file name to avoid overriding
    const uploadPath = path.join(
      __dirname,
      "../public/uploads",
      fileName + instructor._id + extName
    );

    //move file to the right directory
    file.mv(uploadPath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      //insert photo in database
      await Instructor.findByIdAndUpdate(req.params.id, { photo: fileName });
      res.status(200).json({
        success: true,
        data: fileName,
      });
    });
  } catch (error) {
    next(error);
  }
});
