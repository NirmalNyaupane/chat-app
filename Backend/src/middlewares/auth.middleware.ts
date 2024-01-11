import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import EnvConfiguration from "../config/env.config";
import commonService from "../services/common.service";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandler";

const verifyJwt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }
    const decodeToken = jwt.verify(token, EnvConfiguration.ACCESS_TOKEN_SECRET ?? "");
    //@ts-ignore
    const user = await commonService.checkUserIsExitOrNot(decodeToken.sub);
    req.body.user = user;
    next();
})

export default verifyJwt;