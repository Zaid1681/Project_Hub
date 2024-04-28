const Student = require("../Schema/Student");
const CustomError = require("../utils/error");
const Project = require("../Schema/Project");
const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dugze0fjd",
//   api_key: "213166633228694",
//   api_secret: "10MYFnSBAUwlWXthZrRIkhgCHDU",
// });

// creating user video
const addProject = async (req, res, next) => {
  try {
    // if (!req.files || !req.files.photos) {
    //   return res.status(400).json({ message: " Fill all the fields" });
    // }

    // const files = Array.isArray(req.files.photos)
    //   ? req.files.photos
    //   : [req.files.photos];
    // const userId = "dummyUser123";
    // const imageUrls = [];

    // for (const file of files) {
    //   const result = await cloudinary.uploader.upload(file.tempFilePath);
    //   imageUrls.push(result.secure_url);
    // }
    const projectData = req.body;
    // const projectData = { userId: userId, ...req.body, image: imageUrls };
    const project = await Project.create(projectData);

    res
      .status(200)
      .json({ message: "Project uploaded successfully", data: project });
    console.log("Project uploaded successfully");
  } catch (error) {
    next(CustomError(500, error));
  }
};
const addGrpProj = async (req, res, next) => {
  try {
    // if (!req.files || !req.files.photos) {
    //   return res.status(400).json({ message: " Fill all the fields" });
    // }
    // console.log(req.body);

    // const files = Array.isArray(req.files.photos)
    //   ? req.files.photos
    //   : [req.files.photos];
    // const userId = "dummyUser123";
    // const imageUrls = [];

    // for (const file of files) {
    //   const result = await cloudinary.uploader.upload(file.tempFilePath);
    //   imageUrls.push(result.secure_url);
    // }

    const projectData = {
      isGroupProj: true,
      ...req.body,
      // image: imageUrls,
    };
    const project = await Project.create(projectData);

    res
      .status(200)
      .json({ message: "Project uploaded successfully", data: project });
    console.log("Project uploaded successfully");
  } catch (error) {
    next(CustomError(500, error));
  }
};

// updating user video
const updStatus = async (req, res, next) => {
  try {
    // Get project id
    const projectId = req.params.id;
    const { status, fId } = req.query;
    console.log(status, fId);
    // her we have to set the faculty id once the project get approved and status become false

    const updateProjectStatus = await Project.findByIdAndUpdate(
      projectId,
      { $set: { isApproved: status, facultyId: fId } },
      { new: true } // Return modified document
    );

    if (updateProjectStatus) {
      res.status(200).json({
        success: true,
        message: "Project Status Updated Successfully",
        data: updateProjectStatus, // Corrected variable name here
      });
    } else {
      res.status(404).json({ success: false, message: "Project not found" });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

const updProject = async (req, res, next) => {
  try {
    // Get product id
    const userId = req.params.id;
    const updateUser = await Project.findByIdAndUpdate(
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
const getAllProject = async (req, res, next) => {
  try {
    const allproject = await Project.find();
    if (!allproject) next(CustomError(404, "Projects Not Found"));
    else {
      res
        .status(200)
        .json({ message: "project fetched successfully ", data: allproject });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// GET video
const getProject = async (req, res, next) => {
  try {
    // const project = await Project.findById();

    const project = await Project.findById(req.params.id);
    if (!project) next(CustomError(404, "Project is not found"));
    else {
      res.status(200).json(project);
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};
const getProjByGrpId = async (req, res, next) => {
  try {
    // const project = await Project.findById();

    const project = await Project.find({ groupId: req.params.id });
    if (!project) next(CustomError(404, "Project is not found"));
    else {
      res.status(200).json(project);
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

const getUnapproved = async (req, res, next) => {
  try {
    const { academic, currentYear, sub, semester } = req.query;
    console.log(academic, currentYear, sub, semester);
    // const project = await Project.findById();

    const project = await Project.find({
      // isApproved: false,
      academicYear: academic,
      currentYear: currentYear,
      subject: sub,
      semester,
    });
    if (!project) next(CustomError(404, "Project is not found"));
    else {
      res.status(200).json(project);
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};
const getSemesterProject = async (req, res, next) => {
  try {
    const { studentId, semester } = req.query;
    console.log(studentId, semester);
    // const project = await Project.findById();

    const project = await Project.find({
      studentId: studentId,
      semester: semester,
    });
    if (!project) next(CustomError(404, "Project is not found"));
    else {
      res.status(200).json(project);
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};
const getSemesterGrpProject = async (req, res, next) => {
  try {
    const { studentId, semester } = req.query;
    console.log(studentId, semester);

    // Find projects where the studentId is present in the membersId array
    const projects = await Project.find({
      semester: semester,
      membersId: { $in: [studentId] }, // Using $in operator to match elements in an array
    });

    if (!projects || projects.length === 0) {
      // If no project is found for the studentId and semester
      return next(CustomError(404, "Project is not found"));
    } else {
      // If projects are found, return them
      res.status(200).json(projects);
    }
  } catch (error) {
    // Handle any errors
    next(CustomError(500, error));
  }
};

const getUserProject = async (req, res, next) => {
  try {
    // const { studentId } = req.query;
    const studentId = req.params.id;
    console.log(studentId);

    // Convert studentId to ObjectId
    // const convertedStudentId = mongoose.Types.ObjectId(studentId);

    const project = await Project.find({ studentId: studentId });

    if (!project) next(CustomError(404, "Project is not found"));
    else {
      res.status(200).json(project);
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};
const getApproved = async (req, res, next) => {
  try {
    const project = await Project.find({ isApproved: true });
    if (!project) next(CustomError(404, "Project is not found"));
    else {
      res.status(200).json(project);
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};
const getAppTitleProj = async (req, res, next) => {
  try {
    const title = req.query.title;
    // Use regular expression to search for projects with the most matching title
    const regex = new RegExp(title, "i"); // 'i' flag for case-insensitive search
    const projects = await Project.find({ isApproved: true, title: regex });

    if (!projects || projects.length === 0) {
      // If no project found, return 404
      return next(CustomError(404, "Project is not found"));
    } else {
      // Return the projects with matching titles
      res.status(200).json(projects);
    }
  } catch (error) {
    // Handle internal server error
    next(CustomError(500, error));
  }
};
const getAppkeyProj = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;

    // Construct a regular expression with 'i' flag for case-insensitive search
    const regex = new RegExp(keyword, "i");

    // Find projects that have at least one keyword matching the regular expression
    const projects = await Project.find({
      isApproved: true,
      keywords: { $regex: regex },
    });

    if (!projects || projects.length === 0) {
      // If no project found, return 404
      return next(CustomError(404, "Project is not found"));
    } else {
      // Return the projects with matching keywords
      res.status(200).json(projects);
    }
  } catch (error) {
    // Handle internal server error
    next(CustomError(500, error));
  }
};

// delete Project
const delProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      res.status(400).json({ success: false, message: "Project Not Found" });

    try {
      await Project.findByIdAndDelete(req.params.id);
      res
        .status(201)
        .json({ success: true, message: "Project Deleted Successfully" });
    } catch (error) {
      next(CustomError(404, error));
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// RANDOM Video
// exports.randomVideo = async (req, res, next) => {
//   try {
//     const random = await Video.aggregate([{ $sample: { size: 10 } }]);
//     res.status(200).json(random);
//     console.log("random videos have been displayed");
//   } catch (error) {
//     next(error);
//   }
// };

// TREND videos
// exports.trendVideo = async (req, res, next) => {
//   try {
//     const trend = await Video.find().sort({ views: -1 }).limit(2);
//     res.status(200).json(trend);
//     console.log("The most trended videos based on views have been displayed");
//   } catch (error) {
//     next(error);
//   }
// };

// SUBSCRIBED Videos ==> it will display the videos of subscribed channels
// exports.subVideo = async (req, res, next) => {
//   try {
//     const userData = await User.findById(req.user.id);
//     const subChannels = userData.subscribedPerson;

//     const list = await Promise.all(
//       subChannels.map((channelId) => {
//         return Video.find({ userId: channelId });
//       })
//     );
//     res.status(200).json(list);
//   } catch (error) {
//     next(error);
//   }
// };

// Get the tagged video
// exports.taggedVideo = async (req, res, next) => {
//   try {
//     const queryTag = req.query.tagged.split(",");
//     const tagged = await Video.find({ tags: { $in: queryTag } }).limit(2);
//     res.status(200).send(tagged);
//   } catch (error) {
//     next(error);
//   }
// };

// Search videos based on the particular text in the video title
// exports.searchTitle = async (req, res, next) => {
//   try {
//     const qtitle = req.query.qtitle;
//     const queryTitle = await Video.find({
//       title: { $regex: qtitle, $options: "i" },
//     })
//       .limit(2)
//       .sort();
//     res.status(200).send(queryTitle);
//   } catch (error) {
//     next(error);
//   }
// };

// Export both functions as an object
module.exports = {
  addProject,
  updProject,
  getAllProject,
  getProject,
  delProject,
  updStatus,
  getApproved,
  getUnapproved,
  getUserProject,
  getSemesterProject,
  addGrpProj,
  getSemesterGrpProject,
  getAppTitleProj,
  getProjByGrpId,
  getAppkeyProj,
};
