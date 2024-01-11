import { NextFunction, Request, Response } from "express";
import userService from "../services/user/user.service";
import asyncHandler from "../utils/AsyncHandler";
class UserController {
    findCurrentUser = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
        return res.status(200).json(req.body.user)
    }
    )
    updateProfilePicture=asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
        const response = await userService.updateProfilePicture(req.body.mediaId, req.body.user);
        return res.status(200).json({message:"Profile picture update sucessfully", response});
    })
}

export default new UserController();