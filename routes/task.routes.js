const express = require("express");
const router = express.Router();
const {
  verifyToken,
  checkAdmin,
  checkFaculty,
} = require("../middleware/auth.middleware.js"); // Fix import statement

const {
  createTask,
  updateTaskById,
  getAllTasks,
  getTaskCriteria,getTaskCriteriaAllForFacultes,
  deleteTaskById,
  updateApprovalStatus,
  getTaskCriteriaAll,
  getTaskByGroupId,
  getTaskById,
} = require("../controller/task.controller.js");

router.get("/getAll", getAllTasks);
router.get("/getTaskById/:id", getTaskById);
// router.get("/getApproved", getApproved);
// router.get("/get/:id", getProject);
// router.get("/get/user/:id", getUserProject);
// router.get("/get/project/unapproved", getUnapproved);
// get semester project
// router.get("/get/project/sem", getSemesterProject);

router.post("/add", createTask); // here i have to check user too
router.put("/update/:id", updateTaskById);
router.put("/updateStatus/:id", updateApprovalStatus);
// checking the taskType
router.get(
  "/getTaskByCriteria/:academicYear/:currentYear/:semester/:subject",
  getTaskCriteria
);
// checking facultyID --> for faculty side
router.get(
  "/getTaskByCriteriaAll/:academicYear/:currentYear/:semester/:subject/:facultyId",
  getTaskCriteriaAll
);
router.get(
  "/getTaskByCriteriaAll/atfaculties/:academicYear/:currentYear/:semester/:subject/:facultyId",
  getTaskCriteriaAllForFacultes
);

// for studentside
router.get(
  "/getTaskByCriteria/:groupId/:currentYear/:academicYear/:semester/:subject/:facultyId",
  getTaskByGroupId
); // getting task assigned to all
// get tsk by faculty id a and currY , academic , sem , subje
// router.put("/upd/status/:id/status", updStatus);
router.delete("/del/:id", deleteTaskById); // checkUser must be there
// router.put("/upd/:id", updProject);

module.exports = router;
