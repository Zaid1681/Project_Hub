const express = require("express");
const {
    createAdmin,
    updateAdmin,
    getAdminById,
    deleteAdmin,
    getAllAdmin
} = require("../controller/admin");
const router = express.Router();

// CREATE A STUDENT
router.post("/add", createAdmin);
router.get("/get", getAllAdmin);
router.get("/getAdminById/:id", getAdminById);

// UPDATE A STUDENT
router.put("/updateAdmin/:id", updateAdmin);

// DELETE A STUDENT
router.delete("/deleteAdmin/:id", deleteAdmin);

module.exports = router;
