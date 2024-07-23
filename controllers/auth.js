const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

//user login
exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(400, " 'Invalid email or password' ");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(400, " 'Invalid email or password' ");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "your_jwt_secret",
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    // Send the token to the client
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
