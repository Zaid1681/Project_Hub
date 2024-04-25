const Student = require("../Schema/Student");
const CustomError = require("../utils/error");
const Project = require("../Schema/Project");
const GroupSubmmsion = require("../Schema/groupSubmission");
const GroupSubmission = require("../Schema/groupSubmission");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dugze0fjd",
  api_key: "213166633228694",
  api_secret: "10MYFnSBAUwlWXthZrRIkhgCHDU",
});

// creating user video
const addGroupSubmission = async (req, res, next) => {
  try {
    if (!req.files || !req.files.photos) {
      return res.status(400).json({ message: " Fill all the fields" });
    }

    const files = Array.isArray(req.files.photos)
      ? req.files.photos
      : [req.files.photos];
    const userId = "dummyUser123";
    const imageUrls = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      imageUrls.push(result.secure_url);
    }

    const projectData = { userId: userId, ...req.body, image: imageUrls };
    const project = await GroupSubmission.create(projectData);

    res
      .status(200)
      .json({ message: "group uploaded successfully", data: project });
    console.log("group uploaded successfully");
  } catch (error) {
    next(CustomError(500, error));
  }
};

// updating user video

const updGroupSubmission = async (req, res, next) => {
  try {
    // Get product id
    const userId = req.params.id;
    const updateUser = await GroupSubmission.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true } // Return modified document
    );

    if (updateUser) {
      res.status(200).json({
        success: true,
        message: "Project Details Updated Successfully",
        data: updateUser,
      });
    } else {
      res.status(404).json({ success: false, message: "Project not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

// project can only be deleted when the
// getAllproject Video


// GET video
const getGroupSubmission = async (req, res, next) => {
  try {
    // const project = await Project.findById();

    const project = await GroupSubmission.findById(req.params.id);
    if (!project) next(CustomError(404, "Project is not found"));
    else {
      res.status(200).json(project);
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};


// Export both functions as an object
module.exports = {
  addGroupSubmission,
  updGroupSubmission,
  getGroupSubmission,
};
