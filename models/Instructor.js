const mongoose = require("mongoose");
const slugify = require("slugify");

const InstructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    slug: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Do not return the password field in queries
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot be more than 500 characters"],
    },
    expertise: {
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Machine Learning",
        "Business",
        "UI/UX",
        "Other",
      ],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please add a valid URL with HTTP or HTTPS",
      ],
    },
    social: {
      twitter: {
        type: String,
        match: [
          /https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}/,
          "Please add a valid Twitter URL",
        ],
      },
      linkedin: {
        type: String,
        match: [
          /https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]{1,30}/,
          "Please add a valid LinkedIn URL",
        ],
      },
      github: {
        type: String,
        match: [
          /https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]{1,39}/,
          "Please add a valid GitHub URL",
        ],
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating can not be more than 10"],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

InstructorSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//cascade delete courses if an instructor is deleted
InstructorSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await this.model("Course").deleteMany({ instructor: this._id });
    next();
  }
);

//courses virtuals
InstructorSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "instructor",
  justOne: false,
});

module.exports = mongoose.model("Instructor", InstructorSchema);
