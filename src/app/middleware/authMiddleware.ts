import { Request } from "express";
import apiAsync from "../../shared/apiAsync";
import { verifyJWT } from "../../util/jwt";
import User from "../modules/user/user.model";

export const AuthMiddleware = apiAsync(async (req: Request, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    let payload = verifyJWT(token);
    console.log("payload", payload);
    let id = payload?.payload;
    let user = await User.findById(id).select("-password");

    if (user) {
      req.user = user;
      return next();
    }
  }

  throw new Error("Invalid User");
});
