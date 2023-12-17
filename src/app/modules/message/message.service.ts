import Message from "./message.model";
import { SchemaObjectId } from "../../../interface/commonTypes";
import { IChat } from "../chat/chat.interface";

const sendMessageToChatRoom = async (
  chat: IChat,
  content: string,
  sender: SchemaObjectId
) => {
  let message = new Message({ chat: chat._id, content, sender });
  await message.save();

  chat.latestMessage = message._id;
  await chat.save();

  return message;
};

export const MessageService = { sendMessageToChatRoom };
