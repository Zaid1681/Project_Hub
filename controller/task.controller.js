const Task = require("../Schema/Task.schema"); // Import the ProjectIdea schema
const CustomError = require("../utils/error");
// Create a new task
const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      assignedDate,
      deadline,
      taskStatus,
      facultyId,
      groupId,
      academicYear,
      subject,
      semester,
      currentYear,
      taskType,
    } = req.body;
    const newTask = new Task({
      title,
      description,
      assignedDate,
      deadline,
      groupId,
      taskStatus,
      taskType,
      facultyId,
      academicYear,
      subject,
      semester,
      currentYear,
    });
    await newTask.save();
    res.status(201).json({
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Get all tasks
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};
const getTaskCriteria = async (req, res, next) => {
  try {
    const { currentYear, academicYear, semester, subject } = req.params;
    console.log(currentYear, academicYear, semester, subject);
    const taskType = "All";
    const tasks = await Task.find({
      currentYear,
      academicYear,
      semester,
      subject,
      taskType,
    });
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};
const getTaskCriteriaAll = async (req, res, next) => {
  try {
    const { currentYear, academicYear, semester, subject, facultyId } =
      req.params;
    console.log(currentYear, academicYear, semester, subject, facultyId);
    // const taskType = "All";
    const tasks = await Task.find({
      currentYear,
      academicYear,
      semester,
      subject,
      facultyId,
      taskType: "All",
    });
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};
const getTaskCriteriaAllForFacultes = async (req, res, next) => {
  try {
    const { currentYear, academicYear, semester, subject, facultyId } =
      req.params;
    console.log(currentYear, academicYear, semester, subject, facultyId);
    // const taskType = "All";
    const tasks = await Task.find({
      currentYear,
      academicYear,
      semester,
      subject,
      facultyId,
    });
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};
const getTaskByGroupId = async (req, res, next) => {
  try {
    const { currentYear, academicYear, semester, subject, groupId, facultyId } =
      req.params;
    console.log(currentYear, academicYear, semester, subject);
    const taskType = "All";
    const tasks = await Task.find({
      currentYear,
      academicYear,
      semester,
      subject,
      facultyId,
      groupId: { $in: [groupId] },
    });
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Get a single task by ID
const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return next(CustomError(404, "Task not found"));
    }
    res.status(200).json({
      message: "Task fetched successfully",
      data: task,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Update a task by ID
const updateTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const {
      title,
      description,
      assignedDate,
      deadline,
      isApproved,
      taskStatus,
      taskType,
      groupId,
    } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        assignedDate,
        deadline,
        isApproved,
        groupId,
        taskStatus,
        taskType,
      },
      { new: true }
    );
    if (!updatedTask) {
      return next(CustomError(404, "Task not found"));
    }
    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Delete a task by ID
const deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return next(CustomError(404, "Task not found"));
    }
    res.status(200).json({
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

const updateApprovalStatus = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { taskStatus } = req.body;
    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { taskStatus },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task approval status updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};
const updateSubmissionStatus = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { submissionStatus } = req.body;
    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { submissionStatus },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task approval status updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  getTaskCriteria,
  updateApprovalStatus,
  getTaskByGroupId,
  getTaskCriteriaAll,
  getTaskCriteriaAllForFacultes,
  updateSubmissionStatus,
};
