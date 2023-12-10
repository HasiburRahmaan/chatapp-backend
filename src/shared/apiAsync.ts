import { NextFunction, Request, RequestHandler, Response } from "express";

const apiAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };

export default apiAsync;
