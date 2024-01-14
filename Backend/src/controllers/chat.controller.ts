import {Request, Response, NextFunction} from 'express';
class ChatController{
    createPrivateChat(req:Request, res:Response, next:NextFunction){ 
        console.log("Chat app");
    }
}
export default new ChatController();