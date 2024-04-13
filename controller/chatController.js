const ChatMessage = require("../Schema/chat.schema"); // Import the ChatMessage model
const CustomError = require("../utils/error");

// Create a new chat message
const createChatMessage = async (req, res, next) => {
  try {
    const {
      senderEmail,
      receiverEmail,
      senderName,
      receiverName,
      currentYear,
      academicYear,
      semester,
      subject,
      description,
      groupId,
      projectId,
    } = req.body;
    const newChatMessage = new ChatMessage({
      senderEmail,
      receiverEmail,
      senderName,
      receiverName,
      currentYear,
      academicYear,
      semester,
      subject,
      description,
      groupId,
      projectId,
    });
    await newChatMessage.save();
    res.status(201).json({
      message: "Chat message created successfully",
      data: newChatMessage,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};
const createChatByGroupId = async (req, res, next) => {
  try {
    const { senderEmail, senderName, description, groupId } = req.body;
    const newChatMessage = new ChatMessage({
      senderEmail,
      senderName,
      description,
      groupId,
    });
    await newChatMessage.save();
    res.status(201).json({
      message: "Chat message Added Sucessfully",
      data: newChatMessage,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};
const createChatByProjId = async (req, res, next) => {
  try {
    const { senderEmail, senderName, description, projectId } = req.body;
    const newChatMessage = new ChatMessage({
      senderEmail,
      senderName,
      description,
      projectId,
    });
    await newChatMessage.save();
    res.status(201).json({
      message: "Chat message Added Sucessfully",
      data: newChatMessage,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Get all chat messages
const getAllChatMessages = async (req, res, next) => {
  try {
    const chatMessages = await ChatMessage.find();
    res.status(200).json({
      message: "Chat messages fetched successfully",
      data: chatMessages,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Get chat messages by faculty email
const getChatMessagesByFacultyEmail = async (req, res, next) => {
  try {
    const { facultyEmail } = req.params.email;
    const chatMessages = await ChatMessage.find({
      receiverEmail: facultyEmail,
    });
    res.status(200).json({
      message: "Chat messages fetched successfully",
      data: chatMessages,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Get chat messages by group ID
const getChatMessagesByGroupId = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const chatMessages = await ChatMessage.find({ groupId });
    res.status(200).json({
      message: "Chat messages fetched successfully",
      data: chatMessages,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Get chat messages by project ID
const getChatMessagesByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const chatMessages = await ChatMessage.find({ projectId });
    res.status(200).json({
      message: "Chat messages fetched successfully",
      data: chatMessages,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Get a single chat message by ID
const getChatMessageById = async (req, res, next) => {
  try {
    const chatMessageId = req.params.id;
    const chatMessage = await ChatMessage.findById(chatMessageId);
    if (!chatMessage) {
      return next(CustomError(404, "Chat message not found"));
    }
    res.status(200).json({
      message: "Chat message fetched successfully",
      data: chatMessage,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Update a chat message by ID
const updateChatMessageById = async (req, res, next) => {
  try {
    const chatMessageId = req.params.id;
    const updatedData = req.body;
    const updatedChatMessage = await ChatMessage.findByIdAndUpdate(
      chatMessageId,
      updatedData,
      { new: true }
    );
    if (!updatedChatMessage) {
      return next(CustomError(404, "Chat message not found"));
    }
    res.status(200).json({
      message: "Chat message updated successfully",
      data: updatedChatMessage,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

// Delete a chat message by ID
const deleteChatMessageById = async (req, res, next) => {
  try {
    const chatMessageId = req.params.id;
    const deletedChatMessage = await ChatMessage.findByIdAndDelete(
      chatMessageId
    );
    if (!deletedChatMessage) {
      return next(CustomError(404, "Chat message not found"));
    }
    res.status(200).json({
      message: "Chat message deleted successfully",
      data: deletedChatMessage,
    });
  } catch (error) {
    next(CustomError(500, error.message || "Internal Server Error"));
  }
};

module.exports = {
  createChatMessage,
  getAllChatMessages,
  getChatMessagesByFacultyEmail,
  getChatMessagesByGroupId,
  getChatMessagesByProjectId,
  getChatMessageById,
  updateChatMessageById,
  createChatByGroupId,
  deleteChatMessageById,
  createChatByProjId,
};
