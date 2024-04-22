const Student = require("../Schema/Student");
const CustomError = require("../utils/error");
const Project = require("../Schema/Project");
const Subject = require("../Schema/Subject");

// creating user video
const createSubject = async (req, res, next) => {
  try {
    const { subjectName, currentYear, semester } = req.body; //received from middleware
    const subjectData = await Subject.find({ ...req.body });
    if (subjectData.length != 0) {
      next(CustomError(500, "Subject Already exist"));
    } else {
      const project = await new Subject({ ...req.body });
      await project.save();
      res
        .status(200)
        .json({ message: "subject created successfully", data: project });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};
// getAllproject Video

const getSubjectDetails = async (req, res, next) => {
  try {
    const { currentYear, semester, subjectName } = req.params;
    console.log(currentYear, semester, subjectName);

    // Fetch subjects based on currentYear and semester
    const subjectData = await Subject.find({
      currentYear: currentYear,
      semester: semester,
      subjectName: subjectName,
    });

    if (subjectData.length === 0) {
      next(CustomError(404, "Subjects don't exist"));
    } else {
      res.status(200).json({
        success: true,
        message: "Subject data fetched successfully",
        data: subjectData,
      });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};
const getAll = async (req, res, next) => {
  try {
    const allsubject = await Subject.find();
    if (!allsubject) next(CustomError(404, "Subjects Not Found"));
    else {
      res.status(200).json({
        message: "Subject list fetched successfully ",
        data: allsubject,
      });
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};
const delSubject = async (req, res, next) => {
  try {
    // Extract the subject ID from the request parameters
    const subjectId = req.params.id;

    // Check if the subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    // Delete the subject by its ID
    await Subject.findByIdAndDelete(subjectId);

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Subject deleted successfully" });
  } catch (error) {
    // Handle errors
    next(error); // Assuming CustomError middleware is used for error handling
  }
};

const getSemSubject = async (req, res, next) => {
  try {
    // const { currentYear, semester } = req.body; // received from middleware
    const { currentYear, semester } = req.query;

    // Fetch subjects based on currentYear and semester
    const subjectData = await Subject.find({
      currentYear: currentYear,
      semester: semester,
    });
    console.log(currentYear, semester);
    // const subjectData = await Subject.find({
    //   currentYear: currentYear,
    //   semester: semester,
    // });

    console.log("subdata", subjectData);

    if (subjectData.length === 0) {
      next(CustomError(500, "Subjects don't exist"));
    } else {
      try {
        const subjectNames = subjectData.map((subject) => subject.subjectName);

        res.status(201).json({
          success: true,
          message: "Semester subject data fetched",
          data: subjectNames,
        });
      } catch (error) {
        next(CustomError(404, error));
      }
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// updating user video
const updStatus = async (req, res, next) => {
  try {
    // Get project id
    const projectId = req.params.id;
    // her we have to set the faculty id once the project get approved and status become false

    const updateProjectStatus = await Project.findByIdAndUpdate(
      projectId,
      { $set: { isApproved: req.body.status, facultyId: req.body.facultyId } },
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

// GET video
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) next(CustomError(404, "Project is not found"));
    else {
      res.status(200).json(project);
    }
  } catch (error) {
    next(CustomError(500, error));
  }
};

// delete Project

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
  createSubject,
  updProject,
  getAll,
  getSemSubject,
  getProject,
  delSubject,
  updStatus,
  getSubjectDetails,
};
