import express from "express";
import { ChatRoutes } from "../modules/chat/chat.route";
import { UserRoutes } from "../modules/user/user.route";

let router = express.Router();

router.use("/chat", ChatRoutes);
router.use("/user", UserRoutes);

export default router;
