const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to  database
connectDB();

//create instance of express app
const app = express();

//body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

//import routes
const instructorsRoutes = require("./routes/instructors");
const coursesRoutes = require("./routes/courses");

app.use("/api/v1/instructors", instructorsRoutes);
app.use("/api/v1/courses", coursesRoutes);

//error middleware
app.use(errorHandler);
//PORT var
const PORT = process.env.PORT || 8080;

//start server and listen to port
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
