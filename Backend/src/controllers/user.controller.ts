import { NextFunction, Request, Response } from "express";
import userService from "../services/user/user.service";
import asyncHandler from "../utils/AsyncHandler";
import { paginateResponse } from "../utils/paginationResponse";
class UserController {
    findCurrentUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json(req.body.user)
    }
    )
    updateProfilePicture = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const response = await userService.updateProfilePicture(req.body.mediaId, req.body.user);
        return res.status(200).json({ message: "Profile picture update sucessfully", response });
    })
    findUserForChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const email = req.body.email;
        const {page,limit}=req.query;
        const [users, count] = await userService.findUserForChat(req.query, email, req.body.user.id);
        //@ts-ignore
        return res.status(200).json({ ...paginateResponse(count, +page, +limit), data: users })
    })
}

export default new UserController();