import mongoose, { Schema } from "mongoose";
import { IMessage, IMessageModel } from "./message.interface";
import User from "../user/user.model";

let MessageSchema = new Schema<IMessage, IMessageModel>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    content: {
      type: String,
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

let Message = mongoose.model<IMessage, IMessageModel>(
  "Messages",
  MessageSchema
);

export default Message;
