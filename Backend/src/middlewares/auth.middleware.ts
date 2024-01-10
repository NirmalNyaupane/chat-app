import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandler";
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import EnvConfiguration from "../config/env.config";
import authService from "../services/auth/auth.service";
import commonService from "../services/common.service";

const verifyJwt = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }
    const decodeToken = jwt.verify(token, EnvConfiguration.ACCESS_TOKEN_SECRET ?? "");

    // const user = commonService.checkUserIsExitOrNot(decodeToken.sub ?? "");
})

export default verifyJwt;