const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validateToken = async (req, res, next) => {
  // Get token from Authorization header

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

  try {
    // Verify token using a secret key
    const decoded = jwt.verify(token, "your_jwt_secret"); // Replace with your secret key
    req.user = await User.findById(decoded.id); // Attach user info to request object

    next(); // Token is valid, proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = validateToken;
