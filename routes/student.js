const express = require("express");
const {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
} = require("../controller/student");
const router = express.Router();

// CREATE A STUDENT
router.post("/createStudent", createStudent);
router.get("/getStudentById/:id", getStudentById);

// UPDATE A STUDENT
router.put("/updateStudent/:id", updateStudent);

// DELETE A STUDENT
router.delete("/deleteStudent/:id", deleteStudent);

module.exports = router;
