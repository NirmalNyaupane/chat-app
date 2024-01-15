import { NextFunction, Request, Response } from 'express';
import chatService from '../services/chat/chat.service';
import commonService from '../services/common.service';
import ApiError from '../utils/ApiError';
import asyncHandler from '../utils/AsyncHandler';

class ChatController {
    createPrivateChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await commonService.checkUserIsExistOrNot(req.params.id);
        if (!user) {
            throw new ApiError(400, "Receiver doesnot exists");
        }
        const receiver = await chatService.findChatByUserId(req.params.id);
        if (receiver) {
            throw new ApiError(400, "Chat is already exists");
        }
        if (req.body.user.id === req.params.id) {
            throw new ApiError(400, "Please provide another user id");
        }
      
        const response = await chatService.createSingleChat(req.body.user, user);
        return res.status(200).json(response);
    })
}

export default new ChatController();    