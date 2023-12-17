import express from "express";
import { ChatController } from "./chat.controller";

let router = express.Router();

router.post("/create-chat", ChatController.createChat);
router.post("/create-group-chat", ChatController.createGroupChat);
router.get("/get-all-chat-rooms", ChatController.getAllChatRoomByUser);
router.put("/update-group-chat-name", ChatController.updateGroupChatName);

export const ChatRoutes = router;
