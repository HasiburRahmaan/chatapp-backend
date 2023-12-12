import { Request, Response } from "express";
import apiAsync from "../../../shared/apiAsync";
import sendResponse from "../../../shared/sendApiResponse";
import User from "./user.model";

let searchUser = apiAsync(async (req: Request, res: Response) => {
  let keyword = req.query.search;

  let users = await User.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  })
    .find({ _id: { $ne: req?.user?._id } })
    .select("name email avater");

  sendResponse(res, {
    success: true,
    statusCode: users?.length ? 200 : 404,
    message: users?.length ? "Success" : "No user found",
    // data: { user, token: generateJWT({ payload: user._id }) },
    item: users,
  });
});

let getAllUser = apiAsync(async (req: Request, res: Response) => {
  let users = await User.find({ _id: { $ne: req.user?._id } }).select(
    "name email avater"
  );

  sendResponse(res, {
    success: true,
    statusCode: users?.length ? 200 : 404,
    message: users?.length ? "Success" : "No user found",
    item: users,
  });
});

export const UserController = { searchUser, getAllUser };
