import { IChat } from "./chat.interface";
import Chat from "./chat.model";
import { MessageService } from "../message/message.service";
import { SchemaObjectId } from "../../../interface/commonTypes";

const createChatRoom = async (
  users: SchemaObjectId[],
  messageText: string,
  isGroupChat: boolean
): Promise<IChat> => {
  if (users.length < 2) {
    throw new Error("Can not create Chat");
  }
  let chat = new Chat({
    isGroupChat,
    users,
    groupAdmins: [users[0]],
  });

  await chat.save();

  let message = await MessageService.sendMessageToChatRoom(
    chat,
    messageText,
    users[0]
  );

  chat.latestMessage = message._id;

  await chat.save();

  return chat;
};

export const ChatService = { createChatRoom };
