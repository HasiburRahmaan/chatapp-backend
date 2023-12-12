import { Request, Response } from "express";
import apiAsync from "../../../shared/apiAsync";
import sendResponse from "../../../shared/sendApiResponse";
import { generateJWT, verifyJWT } from "../../../util/jwt";
import { generateBcryptHash } from "../../../util/bcrypt";
import User from "../user/user.model";

let register = apiAsync(async (req: Request, res: Response) => {
  let { name, email, password } = req.body;
  //   let user = await User.create({ name, email, password });
  let user = new User({
    name,
    email,
    password: await generateBcryptHash(password),
  });
  await user.save();
  let data = {
    name: user.name,
    email: user.email,
    token: generateJWT({ payload: user._id }),
  };
  sendResponse(res, {
    success: true,
    statusCode: 200,
    // data: { user, token: generateJWT({ payload: user._id }) },
    item: data,
  });
});

let login = apiAsync(async (req: Request, res: Response) => {
  let user = await User.findOne({ email: req.body.email });
  if (user && (await user.matchPassword(req.body.password))) {
    sendResponse(res, {
      success: true,

      statusCode: 200,
      item: { user, token: generateJWT({ payload: user._id }) },
    });
  } else {
    throw new Error("Invalid email or password");
  }
});

let verifyToken = apiAsync(async (req: Request, res: Response) => {
  let verified = false;
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    let payload = verifyJWT(token);

    let id = payload?.payload;
    let user = await User.findById(id);

    if (user) {
      verified = true;
      sendResponse(res, {
        success: true,
        statusCode: 200,
        item: { user },
      });
    }
  }

  if (!verified) {
    throw new Error("Invalid token");
  }
});

export const AuthController = { register, login, verifyToken };
