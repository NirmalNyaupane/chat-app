import { NextFunction, Request, Response } from "express";
import { Chat } from "../entities/chat/chat.entity";
import chatService from "../services/chat/chat.service";
import asyncHandler from "../utils/AsyncHandler";
import ApiError from "../utils/ApiError";

const chatAdminAccess = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const requestUserId = req.body.user.id;
    const chatId = req.params.id;

    const chat = await chatService.findChatById(chatId);
    if (!chat) {
        throw new ApiError(400, "Chat with given id not found");
    }
    if (!chat.isGroupChat) {
        throw new ApiError(400, "It is not a group chat");
    }
    // find admin of this chat
    const chatAdmin = await chatService.findChatAdmin(chatId);
    if (chatAdmin?.admin.id !== requestUserId) {
        throw new ApiError(400, "Only admin can add participants")
    }
    req.body.groupChatAdmin = chatAdmin;
    next();
})

export default chatAdminAccess;