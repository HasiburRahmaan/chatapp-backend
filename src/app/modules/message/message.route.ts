import express from "express";
import { MessageController } from "./message.controller";
let router = express.Router();

router.post("/send-message", MessageController.sendMessageToChatRoom);
router.get(
  "/get-messages/by-chatId/:chatId",
  MessageController.getMessagesByChatId
);

export const MessageRoutes = router;
