import { NextFunction, Request, Response } from 'express';
import chatService from '../services/chat/chat.service';
import commonService from '../services/common.service';
import userService from '../services/user/user.service';
import ApiError from '../utils/ApiError';
import asyncHandler from '../utils/AsyncHandler';
import { MediaEntity } from '../entities/media/media.entity';
import { mediaService } from '../services/media/media.service';

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

    createGroupChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        //remove duplicate ids 
        const participants = [...new Set([...req.body.participants])];

        if (participants.length < 2) {
            throw new ApiError(400, "seems like you are passed duplicate participants")
        }

        if (participants.includes(req.body.user.id)) {
            throw new ApiError(400, "You provide one of your id");
        }

        let media: MediaEntity | null = null;
        if (req.body.avatarId) {
            media = await mediaService.getMediaById(req.body.avatarId)
            if (!media) {
                throw new ApiError(400, "avatarId doesnot exists")
            }
        }

        const usersResponse = await userService.findMultipleUserbyIds(participants);

        if (!usersResponse) {
            throw new ApiError(500, "Internal server error");
        }

        for (let user of usersResponse) {
            if (user === null) {
                throw new ApiError(400, "All provided participants are not user");
            }
        }

        const admin = await commonService.checkUserIsExistOrNot(req.body.id);
        //@ts-ignore
        const chatResponse = await chatService.createGroupChat(req.body.name, admin, usersResponse, media);
        if (!chatResponse) {
            throw new ApiError(500, "Internal server error");
        }

        return res.status(200).json(chatResponse);
    })

    updateChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        //remove duplicate ids 
        const participants = [...new Set([...req.body.participants])];

        if (participants.length < 2) {
            throw new ApiError(400, "seems like you are passed duplicate participants")
        }

        const usersResponse = await userService.findMultipleUserbyIds(participants);
        console.log(usersResponse);
        if (!usersResponse) {
            throw new ApiError(500, "Internal server error");
        }
        const admin = await commonService.checkUserIsExistOrNot(req.body.id);

    })
}

export default new ChatController();    