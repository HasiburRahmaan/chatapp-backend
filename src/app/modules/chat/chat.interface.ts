import { Model, Types } from "mongoose";

interface IObjectId {
  type: Types.ObjectId;
  ref: string;
}

export interface IChat {
  name: string;
  isGroupChat: {
    type: boolean;
    default: false;
  };
  users: IObjectId[];
  latestMessage: IObjectId;
  groupAdmins: IObjectId[];
  chatAvatar: string;
}

export type IChatModel = Model<IChat>;
