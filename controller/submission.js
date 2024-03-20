const Submissions = require("../Schema/Submission.schema");

// Controller to create a new submission
const createSubmission = async (req, res, next) => {
  try {
    const submission = await Submissions.create(req.body);
    res.status(201).json({
      success: true,
      message: "Submission created successfully",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};
const getSubmissionTaskId = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const submissionList = await Submissions.find({taskId});
    res.status(201).json({
      success: true,
      message: "Submission Fetched",
      data: submissionList,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to update an existing submission
const updateSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const submission = await Submissions.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Submission updated successfully",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to delete a submission
const deleteSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const submission = await Submissions.findByIdAndDelete(id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Submission deleted successfully",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubmission,
  updateSubmission,
  deleteSubmission,getSubmissionTaskId
};
