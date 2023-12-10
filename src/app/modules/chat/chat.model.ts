import mongoose, { Schema } from "mongoose";
import { IChat, IChatModel } from "./chat.interface";

let ObjectId = Schema.Types.ObjectId;

const chatSchema = new Schema<IChat, IChatModel>(
  {
    name: {
      type: String,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "Message",
    },
    groupAdmins: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    chatAvatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dq7l8216n/image/upload/v1610225195/default-avatar.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model<IChat, IChatModel>("Chat", chatSchema);

export default ChatModel;
