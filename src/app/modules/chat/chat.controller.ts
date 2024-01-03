import { Request, Response } from "express";
import apiAsync from "../../../shared/apiAsync";
import sendResponse from "../../../shared/sendApiResponse";
import Chat from "./chat.model";
import { ChatService } from "./chat.service";
import User from "../user/user.model";

const createChat = apiAsync(async (req: Request, res: Response) => {
  let { userId, messageText } = req.body;

  if (!userId || !messageText) {
    throw new Error("Invalid data");
  }

  let chatRoom = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user?._id, req.body.userId] },
  });

  let chat;

  if (!chatRoom) {
    chat = await ChatService.createChatRoom(
      [req.user?._id, userId],
      messageText,
      true
    );
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    item: chat,
  });
});

const createGroupChat = apiAsync(async (req: Request, res: Response) => {
  let { members, messageText } = req.body;

  if (!members.length || !messageText) {
    throw new Error("Invalid data");
  }

  // let users = await User.find({
  //   _id: { $in: [...members], $ne: { _id: req.user?._id } },
  // }).select("_id");
  let users = await User.distinct("_id", {
    _id: { $in: [...members], $ne: { _id: req.user?._id } },
  });

  let chat = await ChatService.createChatRoom(
    [req.user?._id, ...users],
    messageText,
    true
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    item: chat,
  });
});

const getAllChatRoomByUser = apiAsync(async (req, res) => {
  let chatRooms = await Chat.find({
    users: { $in: [req.user?._id] },
  })
    .populate("latestMessage")
    .populate("users", "_id name avater");

  sendResponse(res, {
    success: true,
    statusCode: 200,
    item: chatRooms,
  });
});

const updateGroupChatName = apiAsync(async (req, res) => {
  let { chatId, name } = req.body;

  let chat = await Chat.findOneAndUpdate(
    {
      _id: chatId,
      groupAdmins: { $in: [req.user?._id] },
    },
    {
      name,
    },
    {
      new: true,
    }
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    item: chat,
  });
});

const addMemberToGroupChat = apiAsync(async (req, res) => {
  let { chatId, users } = req.body;

  let chat = await Chat.findOneAndUpdate(
    { $id: chatId, groupAdmins: { $in: [req?.user?._id] } },
    {
      $push: { users: [...users] },
    },
    {
      new: true,
    }
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    item: chat,
  });
});
const removeMemberFromGroupChat = apiAsync(async (req, res) => {
  let { chatId, users } = req.body;

  let chat = await Chat.findOneAndUpdate(
    { $id: chatId, groupAdmins: { $in: [req?.user?._id] } },
    {
      $pull: { users: [...users] },
    },
    {
      new: true,
    }
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    item: chat,
  });
});

export const ChatController = {
  getAllChatRoomByUser,
  createChat,
  createGroupChat,
  updateGroupChatName,
  addMemberToGroupChat,
  removeMemberFromGroupChat,
};
