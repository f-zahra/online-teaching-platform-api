const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//load env vars
dotenv.config({ path: "./config/config.env" });

//create instance of express app
const app = express();

//Dev logging middleware
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

//import routes
const instructorsRoutes = require("./routes/instructors");

app.use("/api/v1/instructors", instructorsRoutes);

//PORT var
const PORT = process.env.PORT || 8080;

//start server and listen to port
app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
