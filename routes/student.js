const express = require("express");
const {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getAllStudent,
} = require("../controller/student");
const router = express.Router();

// CREATE A STUDENT
router.post("/createStudent", createStudent);
router.get("/getAll", getAllStudent);
router.get("/getStudentById/:id", getStudentById);

// UPDATE A STUDENT
router.put("/updateStudent/:id", updateStudent);

// DELETE A STUDENT
router.delete("/deleteStudent/:id", deleteStudent);

module.exports = router;
