import { Response } from "express";

type IApiRespose<T> = {
  success: boolean;
  message?: string;
  statusCode: number;
  item?: T | any;
};

const sendResponse = <T>(res: Response, data: IApiRespose<T>): void => {
  const responseData: IApiRespose<T> = {
    success: data.success,
    message: data.message || "Success",
    statusCode: data.statusCode,
    item: data.item || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
