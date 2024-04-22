const express = require("express");
const router = express.Router();
const {
  getAll,
  // getSubject,
  createSubject,
  // updateSubject,
  delSubject,
  getSemSubject,
  getSubjectDetails,
} = require("../controller/subject");

router.get("/getall", getAll); // to -- return all subject name here -- admin routes
router.get(
  "/getsubjectDetail/:currentYear/:semester/:subjectName",
  getSubjectDetails
); // to -- return all subject name here -- admin routes
// router.get("/get/:id", getSubject); // to -- get specific subject name
router.post("/add", createSubject);
// router.put("/upd/:id", updateSubject); // to -- update subject
router.delete("/delete/:id", delSubject); // admin
router.get("/get/sub", getSemSubject); // to return sem wise sub ----> select SE ,sem-7  --> return sem subject name

module.exports = router;
