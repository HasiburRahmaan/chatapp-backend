import { Model, Types } from "mongoose";

interface IObjectId {
  type: Types.ObjectId;
  ref: string;
}

export interface IMessage {
  sender: IObjectId;
  content: string;
  chat: IObjectId;
}

export type IMessageModel = Model<IMessage>;
