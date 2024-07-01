exports.getInstructors = (req, res) => {
  res.status(200).json({ success: true, msg: "get all instructors" });
};

exports.addInstructor = (req, res) => {
  res.status(200).json({ success: true, msg: `instructor added` });
};

exports.updateInstructor = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `instructor  ${req.params.id} updated` });
};

exports.deleteInstructor = (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `instructor  ${req.params.id} deleted` });
};
