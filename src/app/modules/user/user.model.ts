import mongoose, { Schema } from "mongoose";
import { IUser, IUserMethods, IUserModel } from "./user.interface";
import { compare } from "bcrypt";

let UserSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avater: {
      type: String,
      default:
        "https://res.cloudinary.com/dq7l8216n/image/upload/v1610225195/default-avatar.jpg",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await compare(enteredPassword, this.password);
};

let User = mongoose.model<IUser, IUserModel>("Users", UserSchema);

export default User;
