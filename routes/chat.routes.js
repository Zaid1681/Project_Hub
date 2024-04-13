const express = require("express");
const {
  createChatMessage,
  deleteChatMessageById,
  getChatMessagesByFacultyEmail,
  getChatMessagesByGroupId,
  createChatByGroupId,
  getAllChatMessages,
  getChatMessagesByProjectId,
  updateChatMessageById,
} = require("../controller/chatController");
const router = express.Router();

// CREATE A STUDENT
router.post("/add", createChatMessage);
router.post("/add/groupId", createChatByGroupId);
router.get("/get/:email", getChatMessagesByFacultyEmail);
router.get("/get/groupId/:groupId", getChatMessagesByGroupId);
router.get("/get/projectId/:projectId", getChatMessagesByProjectId);
router.get("/get", getAllChatMessages);
// router.get("/getStudentById/:id", getStudentById);

// UPDATE A STUDENT
router.put("/update/:id", updateChatMessageById);

// DELETE A STUDENT
router.delete("/del/:id", deleteChatMessageById);

module.exports = router;
