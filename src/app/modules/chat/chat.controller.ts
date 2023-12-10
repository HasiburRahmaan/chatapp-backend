import { Request, Response } from "express";
import apiAsync from "../../../shared/apiAsync";
import sendResponse from "../../../shared/sendApiResponse";

export const getAllChatRoomByUser = apiAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: "Hello World",
  });
});

export const ChatController = { getAllChatRoomByUser };
