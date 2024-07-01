const Instructor = require("../models/Instructor");

//get all
exports.getInstructors = async (req, res) => {
  const instructors = await Instructor.find();

  res.status(200).json({
    success: true,
    count: instructors.length.toFixed,
    data: instructors,
  });
};
//get by id
//validate id(correct and incorrect format)

//create a instructor
exports.addInstructor = async (req, res) => {
  //insert data
  try {
    const instructor = await Instructor.create(req.body);

    res.status(201).json({ success: true, data: instructor });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

exports.updateInstructor = (req, res) => {
  //TODO update instructor data
};

exports.deleteInstructor = (req, res) => {
  //TODO delete instructor by id
};
