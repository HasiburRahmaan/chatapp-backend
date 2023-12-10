import express from "express";
import { UserController } from "./user.controller";

let router = express.Router();

router.post("/registration", UserController.register);
router.post("/login", UserController.login);

export const UserRoutes = router;
