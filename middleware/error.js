const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  //copy err object
  let error = { ...err };
  error.message = err.message;
  console.log(err.errors);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse(
      400,
      `Instructor with id ${err.value} was not found`
    );
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = new ErrorResponse(400, "instructor already exist");
  }

  // Mongoose data field validation (mongoose return a msg for each reuired field)
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(400, message);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
