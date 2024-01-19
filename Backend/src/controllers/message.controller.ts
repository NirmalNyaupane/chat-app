import { NextFunction, Request, Response } from "express";
import chatService from "../services/chat/chat.service";
import ApiError from "../utils/ApiError";
import asyncHandler from '../utils/AsyncHandler';
import messageService from "../services/chat/message.service";
import { paginateResponse } from "../utils/paginationResponse";

class MessageController {
    sendMessage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { content, attatchment } = req.body;
        const chatId = req.params.id;
        const userId = req.body.user.id;
        const chat = await chatService.findChatAdmin(chatId);

        if (!chat) {
            throw new ApiError(400, "Chat is not found");
        }

        //finding participants associated with that chat
        const participants = chat?.participants.map((participant) => participant.id);
        if (!participants?.includes(userId)) {
            throw new ApiError(400, "User is not associated with this chat")
        }

        //if attatchment is include
        await messageService.sendMessage({
            sender: req.body.user, attatchment, content, chat
        });

        res.status(200).json({ message: "Message is send sucessfully" })
    })

    getMessage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { page, limit, name } = req.query;
        const chatId = req.params.id;
        const userId = req.body.user.id;
        const chat = await chatService.findChatById(chatId);
        if (!chat) {
            throw new ApiError(400, "Chat is not found");
        }
        //finding participants associated with that chat
        const participants = chat?.participants.map((participant) => participant.id);
        if (!participants?.includes(userId)) {
            throw new ApiError(400, "User is not associated with this chat")
        }

        const [message, count] = await messageService.getMessageByChatId(req.query, chatId);
        // @ts-ignore
        return res.status(200).json({ ...paginateResponse(count, +page, +limit), data: message })
    })
    deleteMessage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const messageId = req.params.id;
        const message = await messageService.findMessageById(messageId);
        const userId = req.body.user.id;
        if (!message) {
            throw new ApiError(400, "Message is not found");
        }
        const senderId = message.sender.id;

        if (senderId !== userId) {
            throw new ApiError(400, "Only sender can delete it");
        }

        const deleteResponse = await messageService.deleteMessage(messageId);

        if (deleteResponse.affected === 1) {
            res.status(200).json({ message: "Message delete sucessfully" })
        } else {
            throw new ApiError(500, "Internal server error");
        }
    })


    updateMessage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const messageId = req.params.id;
        const { content } = req.body;
        const userId = req.body.user.id;
        const message = await messageService.findMessageById(messageId);

        if (!message) {
            throw new ApiError(400, "Message not found");
        }
        const senderId = message.sender.id;

        if (senderId !== userId) {
            throw new ApiError(400, "Only sender can delete it");
        }
        const updateMessageResponse = await messageService.updateMessage(message, content);

        if (updateMessageResponse) {
            res.status(200).json({ message: "Message updated sucessfully", data: updateMessageResponse })
        } else {
            throw new ApiError(500, "Internal server error")
        }
    })
}

export default new MessageController;