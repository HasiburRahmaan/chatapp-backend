import { Document, Model, Types } from "mongoose";
import { SchemaObjectId } from "../../../interface/commonTypes";

export interface IChat extends Document {
  _id?: SchemaObjectId;
  name: string;
  isGroupChat: {
    type: boolean;
    default: false;
  };
  users: SchemaObjectId[];
  latestMessage: Types.ObjectId;

  groupAdmins: SchemaObjectId[];
  chatAvatar: string;
}

export type IChatModel = Model<IChat>;
