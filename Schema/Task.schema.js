const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { taskStatus, taskType } = require("../utils/taskStatus.js");

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxLength: [150, "title should not exceed 150 characters"],
      required: [true, "title is required"],
    },
    subject: {
      type: String,
      trim: true,
      maxLength: [150, "subject should not exceed 150 characters"],
      required: [true, "subject is required"],
    },
    currentYear: {
      type: String,
      trim: true,
      maxLength: [150, "CurrentYear should not exceed 150 characters"],
      required: [true, "CurrentYear is required"],
    },
    academicYear: {
      type: String,
      trim: true,
      maxLength: [150, "academic should not exceed 150 characters"],
      required: [true, "academic is required"],
    },
    semester: {
      type: Number,
      required: [true, "semester is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    assignedDate: {
      type: Date, // Changed type to Date
      required: [true, "assignedDate is required"],
    },
    deadline: {
      type: Date, // Changed type to Date
    },
    taskStatus: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.Pending,
    },
    submissionStatus: {
      type: String,
      // enum: Object.values(taskStatus),
      default: "Pending",
    },
    taskType: {
      type: String,
      enum: Object.values(taskType),
      default: taskType.All,
    },
    groupId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Group", // Reference to the Group model
      default: null,
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      default: null,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("TaskAssigned", TaskSchema);

module.exports = Task;
