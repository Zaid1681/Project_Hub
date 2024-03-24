const express = require("express");
const router = express.Router();
const {
  verifyToken,
  checkAdmin,
  checkFaculty,
} = require("../middleware/auth.middleware.js"); // Fix import statement

const {
  addGroup,
  //   updProject,
  getAllGroup,
  updateStatus,
  delGroup,
  getGroup,
  getGroupWithId,
  getGroupsByCriteria,
  updateGuide,
  getApprovedGroup,
  getGroupMembers,
  updateGrpStatus,
  //   getProject,
  //   delProject,
  //   updStatus,
  //   getApproved,
  //   getUserProject,
  //   getUnapproved,
  //   getSemesterProject,
} = require("../controller/group.controller.js");

router.get("/getAll", getAllGroup);
router.get(
  "/groupsList/get/:academic/:currentYear/:subject/:semester",
  getGroupsByCriteria
);
router.get(
  "/groupsList/get/approved/:academic/:currentYear/:subject/:semester/:guideId",
  getApprovedGroup
);
router.get(
  "/groupsList/get/:academic/:currentYear/:subject/:semester/groupMembers/:groupId",
  getGroupMembers
);
router.get("/getWithMemberId/get/:memberId", getGroupWithId);
router.post("/add", addGroup); // here i have to check user too

router.get("/groupDetail/get/:id", getGroup); // here i have to check user too
router.put("/updateStatus/:id/:projId/status", updateStatus); // updating the approved projId and isApproved
router.put("/updateGrpStatus/:id/:status", updateGrpStatus); //==> jsut updating the groupStatus
router.put("/update/guide/:groupId/:guideId/name", updateGuide);
router.delete("/del/:id", checkFaculty, delGroup); // checkUser must be there

module.exports = router;
