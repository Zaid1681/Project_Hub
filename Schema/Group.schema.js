const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProjectStatus = require("../utils/projectStatus.js");
const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100, // Maximum 100 characters for the title
    },

    membersId: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student", // Reference to the User model
        },
      ],
      required: true,
    },
    groupLeaderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to the User model
      required: [true, "groupLeaderId is required"],
    },
    membersName: {
      type: [String],
      trim: true,
      ref: "Student",
      required: [true, "Group Members Name is required"],
    },
    groupLeaderName: {
      type: String,
      ref: "Student",
      trim: true,
      required: [true, "Group Leader Name is required"],
    },
    currentYear: {
      type: String,
      trim: true,
      required: [true, "Current Year is required"],
    },
    academicYear: {
      type: String,
      trim: true,
      required: [true, "Academic Year is required"],
    },
    semester: {
      type: Number,
      trim: true,
      required: [true, "Semester is required"],
    },
    subject: {
      type: String,
      trim: true,
      required: [true, "Subject  is required"],
    },
    approvedProjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectIdea", // Reference to the User model
      default: null,
    },
    isProjectApproved: {
      // this will be set true once a
      type: Boolean,
      default: false,
    },
    projectStatus: {
      type: String,
      enum: Object.values(ProjectStatus),
      default: ProjectStatus.Inprocess,
    },
    guideName: {
      type: String,
      trim: true,
      default: null,
    },
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", // Reference to the User model
      default: null,
    },
  },

  { timestamps: true }
);
const Group = mongoose.model("group", groupSchema);

module.exports = Group;
