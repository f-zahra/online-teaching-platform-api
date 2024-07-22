const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload");

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

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

app.use(
  fileupload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 1 MB
  })
);

//import routers
const instructorsRoutes = require("./routes/instructors");
const coursesRoutes = require("./routes/courses");
const authRouter = require("./routes/authRoute");

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/instructors", instructorsRoutes);
app.use("/api/v1/courses", coursesRoutes);
app.use("/api/v1/user", authRouter);
//error middleware
app.use(errorHandler);
//PORT var
const PORT = process.env.PORT || 8080;

//start server and listen to port
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
