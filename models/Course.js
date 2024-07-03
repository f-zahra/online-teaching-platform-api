const mongoose = require("mongoose");
const slugify = require("slugify");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add a title"],
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: "Instructor",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  studentsEnrolled: {
    type: Number,
    default: 0,
  },
});
courseSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Course", courseSchema);
