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

  message = await (
    await message.populate("sender", "_id name avater")
  ).populate("chat", "_id users");

  chat.latestMessage = message._id;
  await chat.save();

  return message;
};

const getMessagesByChatId = async (chatId: SchemaObjectId) => {
  let messages = await Message.find({ chat: chatId }).populate(
    "sender",
    "_id name avater"
  );
  return messages;
};

export const MessageService = { sendMessageToChatRoom, getMessagesByChatId };
