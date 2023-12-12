import express from "express";
import { ChatRoutes } from "../modules/chat/chat.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

let router = express.Router();

router.use("/chat", ChatRoutes);
router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

export default router;
