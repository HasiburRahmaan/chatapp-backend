import dotenv from "dotenv";

dotenv.config();

export const env = process.env.NODE_ENV || "development";
export const port = process.env.PORT || 5000;
export const jwt_secret = process.env.JWT_SECRET || "secret";
export const jwt_expiration = process.env.JWT_EXPIRATION || 3600 * 24 * 30;
