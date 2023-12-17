import mongoose, { Schema, Types } from "mongoose";
import { IChat, IChatModel } from "./chat.interface";
import Message from "../message/message.model";
import User from "../user/user.model";

let ObjectId = Types.ObjectId;

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
        ref: User,
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: Message,
    },
    groupAdmins: [
      {
        type: ObjectId,
        ref: User,
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

const Chat = mongoose.model<IChat, IChatModel>("Chat", chatSchema);

export default Chat;
