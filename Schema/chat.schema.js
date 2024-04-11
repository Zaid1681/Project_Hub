const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema(
  {
    senderEmail: {
      type: String,
    //   required: true,
    },
    receiverEmail: {
      type: String,
    //   required: true,
    },
    senderName: {
      type: String,
    //   required: true,
    },
    receiverName: {
      type: String,
    //   required: true,
    },
    currentYear: {
      type: String,
    //   required: true,
    },
    academicYear: {
      type: String,
    //   required: true,
    },
    semester: {
      type: Number,
    //   required: true,
    },
    subject: {
      type: String,
    //   required: true,
    },
    description: {
      type: String,
    //   required: true,
    },
    groupId: {
        type: [mongoose.Schema.Types.ObjectId],
        // required: true,
    },
    projectId: {
        type: [mongoose.Schema.Types.ObjectId],
    //   required: true,
    },
  },
  { timestamps: true }
);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

module.exports = ChatMessage;
