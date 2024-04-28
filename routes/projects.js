const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middleware/auth.middleware"); // Fix import statement

const {
  addProject,
  updProject,
  getAllProject,
  getProject,
  delProject,
  updStatus,
  getApproved,
  getUserProject,
  getUnapproved,
  getSemesterProject,
  addGrpProj,
  getProjByGrpId,
  getSemesterGrpProject,
  getAppTitleProj,
  getAppkeyProj,
} = require("../controller/project");

router.get("/getAll", getAllProject);
router.get("/getApproved", getApproved);
router.get("/getApproved/title", getAppTitleProj);
router.get("/getApproved/keyword", getAppkeyProj);
router.get("/get/:id", getProject);
router.get("/get/group/:id", getProjByGrpId);
router.get("/get/user/:id", getUserProject);
router.get("/get/project/unapproved", getUnapproved);
// get semester project
router.get("/get/project/sem", getSemesterProject);
router.get("/get/group/project/sem", getSemesterGrpProject);

router.post("/add", addProject); // here i have to check user too
router.post("/add/groupProject", addGrpProj); // here i have to check user too
// router.post("/updateStatus",verfiyFacutly, updStatus);
router.put("/upd/status/:id/status", updStatus);
router.delete("/del/:id", delProject); // checkUser must be there
router.put("/upd/:id", updProject);

module.exports = router;
