const mongoose = require("mongoose");

// Connect to MongoDB Atlas
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.error(err));
};

module.exports = connectDB;
