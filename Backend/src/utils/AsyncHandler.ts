import { Request, Response, NextFunction } from "express";
const asyncHandler =
  (fun: Function) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fun(req, res, next)).catch((err) => next(err));

export default asyncHandler;
