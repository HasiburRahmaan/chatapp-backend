import { Model, Types } from "mongoose";
import { SchemaObjectId } from "../../../interface/commonTypes";

interface IObjectId {
  type: SchemaObjectId;
  ref: string;
}

export interface IMessage {
  sender: SchemaObjectId;
  content: string;
  chat: SchemaObjectId;
}

export type IMessageModel = Model<IMessage>;
