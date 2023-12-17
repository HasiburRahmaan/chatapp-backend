import express from "express";
import { MessageController } from "./message.controller";
let router = express.Router();

router.post("/send-message", MessageController.sendMessageToChatRoom);

export const MessageRoutes = router;
