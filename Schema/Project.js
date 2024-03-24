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
const SocialMediaLinkSchema = new Schema(
  {
    platform: {
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

const projectSchema = new Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    pdfLinks: {
      type: [String],
      default: [],
    },
    // socialMediaLinks: {
    //   type: [SocialMediaLinkSchema],
    //   default: [],
    // },
    githubLink: {
      type: String,
      requried: true,
      defualt: "",
    },
    linkedinLink: {
      type: String,
      default: "",
    },
    currentYear: {
      // SE , FE , TE , BE
      type: String,
      // required: true,
    },
    semester: {
      // 1,2,3,4,5,6,6,
      type: Number,
      // required: true,
    },
    academicYear: {
      // 2023-2024
      type: String,
      // required: true,
    },
    subject: {
      // Manet , IOE
      type: String,
      // required: true,
    },
    isApproved: {
      // should be done by faculty only
      type: Boolean,
      default: false,
    },
    keywords: {
      type: [String],
      // required: true,
      default: [],
    },
    studentId: {
      type: String,
      ref: "Student", // Assuming you have a User model, replace 'User' with the actual model name
      default: null, // Set default to null or another ObjectId if needed
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "Faculty", // Assuming you have a User model, replace 'User' with the actual model name
      default: null,
    },
    sName: {
      type: String,
      default: "",
    },
    image: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
