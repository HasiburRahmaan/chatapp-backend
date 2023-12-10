import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avater: string;
}
export interface IUserMethods {
  matchPassword(text: string): Promise<boolean>;
}

export type IUserModel = Model<IUser, {}, IUserMethods>;
