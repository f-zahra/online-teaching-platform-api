const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
//load env vars
dotenv.config({ path: "./config/config.env" });
//load model
const Instructor = require("./models/Instructor");
const Course = require("./models/Course");
//connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

//read json file
const instructors = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/instructors.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
//import into db async and exit sys
const addData = async () => {
  try {
    await Instructor.create(instructors);
    await Course.create(courses);
    console.log("data added");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//delete data
const deleteData = async () => {
  try {
    await Instructor.deleteMany();
    await Course.deleteMany();
    console.log("data deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//set conditional statement for which function to call
if (process.argv[2] === "-i") {
  addData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
