const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middleware/auth.middleware"); // Fix import statement

const {
  addGroupSubmission,
  updGroupSubmission,
  getGroupSubmission,
} = require("../controller/groupSubmission");

router.get("/get/:id", getGroupSubmission);

router.post("/add", addGroupSubmission); // here i have to check user too

router.put("/upd/:id", updGroupSubmission);

module.exports = router;
