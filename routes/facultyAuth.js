const express = require("express");
const {
  signup,
  signin,
  delFaculty,
  getFacultyByEmail,
  getFacultyNameList,
  getFacultyList,
} = require("../controller/facultyController");
const { verifyToken, checkAdmin } = require("../middleware/auth.middleware"); // Fix import statement
const router = express.Router();

// CREATE A USER
router.post("/signup", signup);
// SIGN IN
router.post("/signin", signin);
router.delete("/del/:id", checkAdmin, delFaculty);
router.get("/getfaculty/email", getFacultyByEmail);
router.get("/getfaculty/getNamelist", getFacultyNameList);
router.get("/getAllfaculty/getlist", getFacultyList);

module.exports = router;
