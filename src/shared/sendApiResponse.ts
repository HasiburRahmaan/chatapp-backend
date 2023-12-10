import { Response } from "express";

type IApiRespose<T> = {
  success: boolean;
  message?: string;
  statusCode: number;
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiRespose<T>): void => {
  const responseData: IApiRespose<T> = {
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
