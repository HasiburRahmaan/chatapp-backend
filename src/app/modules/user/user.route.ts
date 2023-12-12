import express from "express";
import { UserController } from "./user.controller";
import { AuthMiddleware } from "../../middleware/authMiddleware";

let router = express.Router();

router.get("/all-user", AuthMiddleware, UserController.getAllUser);

router.get("/search-user", AuthMiddleware, UserController.searchUser);
// router.post("/login", UserController.login);
// router.get("/verify", UserController.verifyToken);

export const UserRoutes = router;
