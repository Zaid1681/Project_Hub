const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { taskStatus, taskType } = require("../utils/taskStatus.js");

const SubmissionSchema = new Schema(
  {
    subject: {
      type: String,
      trim: true,
      maxLength: [150, "subject should not exceed 150 character"],
      required: [true, "subject is required"],
    },
    currentYear: {
      type: String,
      trim: true,
      maxLength: [150, "CurrentYear should not exceed 150 character"],
      required: [true, "CurrentYear is required"],
    },
    academicYear: {
      type: String,
      trim: true,
      maxLength: [150, "academic should not exceed 150 character"],
      required: [true, "academic is required"],
    },
    semester: {
      type: Number,
      trim: true,
      maxLength: [150, "semester should not exceed 150 character"],
      required: [true, "semester is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    pdfLink: {
      type: String,
    },
    githubLink: {
      type: String,
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group", // Re ference to the Group model
      default: null,
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      default: null,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      default: null,
    },
  },
  { timestamps: true }
);

const Submissions = mongoose.model("Submissions", SubmissionSchema);

module.exports = Submissions;
