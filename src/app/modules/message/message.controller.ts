import apiAsync from "../../../shared/apiAsync";
import sendResponse from "../../../shared/sendApiResponse";
import Chat from "../chat/chat.model";
import { MessageService } from "./message.service";

const sendMessageToChatRoom = apiAsync(async (req, res) => {
  let { chatId, messageText } = req.body;

  let chatRoom = await Chat.findOne({
    $and: [
      { _id: chatId },
      {
        users: { $in: [req.user?._id] },
      },
    ],
  });
  // .populate({
  //   path: "latestMessage",
  //   populate: {
  //     path: "sender",
  //     model: User,
  //     select: "name avater",
  //   },
  // });

  if (!chatRoom) {
    throw new Error("Chat not found");
  }

  let message = await MessageService.sendMessageToChatRoom(
    chatRoom,
    messageText,
    req.user?._id
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    item: chatRoom,
  });
});

export const MessageController = {
  sendMessageToChatRoom,
};
