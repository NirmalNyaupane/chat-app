import { Request, Response, NextFunction } from "express";
class UserController{
    findCurrentUser(req:Request, res:Response, next:NextFunction){
        return res.status(200).json(req.body.user)
    }
}

export default new UserController();