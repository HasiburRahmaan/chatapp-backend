import express from "express";
import { AuthController } from "./auth.controller";

let router = express.Router();

router.post("/registration", AuthController.register);
router.post("/login", AuthController.login);
router.get("/verify", AuthController.verifyToken);

export const AuthRoutes = router;
