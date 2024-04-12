const express = require("express");
const {
  signup,
  signin,
  getAllStudents,
  getStudent,
  getStudentNameById,
  delStudent,
  getStudentEmail,
} = require("../controller/auth");
const router = express.Router();

// CREATE A USER
router.post("/signup", signup); // user can be created using the same route for now
// // SIGN IN
router.post("/signin", signin);
router.get("/getAllStudents", getAllStudents);
router.get("/getEmail/:email", getStudentEmail);
router.get("/getStudent/:id", getStudent);
router.delete("/delStudent/:id", delStudent);
router.get("/getStudentByID", getStudentNameById);

module.exports = router;
