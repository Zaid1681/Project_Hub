const express = require("express");
const {
  createSubmission,
  updateSubmission,
  deleteSubmission,
  getSubmissionTaskId,
  //   getStudentById
} = require("../controller/submission");
const router = express.Router();

// CREATE A STUDENT
router.post("/add", createSubmission);
router.get("/get/taskId/:id", getSubmissionTaskId);
// router.get("/getStudentById/:id", getStudentById);

// UPDATE A STUDENT
router.put("/update/:id", updateSubmission);

// DELETE A STUDENT
router.delete("/del/:id", deleteSubmission);

module.exports = router;
