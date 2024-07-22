const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//user registration
exports.userRegistration = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse(400, "User already exists"));
    }

    // Create and save the new user
    const user = new User({ name, email, role, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};
