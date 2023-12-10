import express from "express";
import { getAllChatRoomByUser } from "./chat.controller";

let router = express.Router();

router.get("/get-all-chat-rooms", getAllChatRoomByUser);

export const ChatRoutes = router;
