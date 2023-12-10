import jwt from "jsonwebtoken";
import { jwt_expiration, jwt_secret } from "../config";

export const generateJWT = (payload: any) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: jwt_expiration });
};
