import express from "express";
import { ChatRoutes } from "../modules/chat/chat.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { MessageRoutes } from "../modules/message/message.route";

let router = express.Router();

router.use("/chat", AuthMiddleware, ChatRoutes);
router.use("/message", AuthMiddleware, MessageRoutes);
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

export default router;
