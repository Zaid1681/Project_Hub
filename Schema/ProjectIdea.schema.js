const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Sub-schema for PDF links
const PdfLinkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

// Sub-schema for Social Media links
// const ProjectIdeaSchema = new Schema(
//   {
//     platform: {
//       type: String,
//       required: true,
//     },
//     link: {
//       type: String,
//       required: true,
//     },
//   },
//   { _id: false }
// );

const ProjectIdeaSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxLength: [150, "title should not exceed 150 character"],
      // required: [true, "title is required"],
    },
    description: {
      type: String,
      trim: true,
      // required: [true, "title is required"],
    },
    pdfLinks: {
      type: [String],
      default: [],
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
    // it is the key used to map one to many project ideas from the group
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group", // Re ference to the Group model
      required: true,
    },
    isApproved: {
      // should be done by faculty only
      type: Boolean,
      default: false,
    },
    facultyId: {
      type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
        default: null,
      },
    },
    facultyName: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

const ProjectIdea = mongoose.model("ProjectIdea", ProjectIdeaSchema);

module.exports = ProjectIdea;
