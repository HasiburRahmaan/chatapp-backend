import jwt, { JwtPayload } from "jsonwebtoken";
import { jwt_expiration, jwt_secret } from "../config";

export const generateJWT = (payload: any) => {
  return jwt.sign(payload, jwt_secret, { expiresIn: jwt_expiration });
};

export const verifyJWT = (token: string) => {
  let payload: string | JwtPayload = jwt.verify(token, jwt_secret);
  return (payload as JwtPayload) || null;
};
