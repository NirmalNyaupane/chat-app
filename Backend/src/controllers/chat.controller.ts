import { NextFunction, Request, Response } from 'express';
import { MediaEntity } from '../entities/media/media.entity';
import { UserEntity } from '../entities/user/user.entity';
import chatService from '../services/chat/chat.service';
import commonService from '../services/common.service';
import { mediaService } from '../services/media/media.service';
import userService from '../services/user/user.service';
import ApiError from '../utils/ApiError';
import asyncHandler from '../utils/AsyncHandler';

class ChatController {
    createPrivateChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await commonService.checkUserIsExistOrNot(req.params.id);
        if (!user) {
            throw new ApiError(400, "Receiver doesnot exists");
        }
        const receiver = await chatService.findPrivateChatByUserId(req.params.id);
        console.log(receiver)
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

    addParticipants = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        //remove duplicate ids 
        let participants = [...new Set([...req.body.participants])];


        if (participants.includes(req.body.user.id)) {
            throw new ApiError(400, "You provide one of your id");
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
        //@ts-ignore
        const constres = await chatService.addParticipants(req.body.groupChatAdmin, usersResponse)
        return res.status(200).json(constres)
    })

    removeParticipants = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const groupChat = req.body.groupChatAdmin;
        const participantToBeRemove = req.body.participant;
        const participants: UserEntity[] = groupChat.participants;

        const participantIds = participants?.map((participant) => {
            return participant.id;
        });

        if (participantToBeRemove === req.body.user.id) {
            throw new ApiError(400, "You cannot remove youself");
        }

        if (!participantIds.includes(participantToBeRemove)) {
            throw new ApiError(400, "User doesnot belongs to this group chat");
        }

        const response = await chatService.removeParticipant(groupChat, participantToBeRemove);

        if (response) {
            return res.status(200).json({ message: "Participants delete sucessfullty", response })
        }
    })

    deleteChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const chat = await chatService.findChatById(id);
        if (!chat) {
            throw new ApiError(400, "chat not found");
        }
        if (chat.isGroupChat) {
            if (chat.admin.id !== req.body.user.id) {
                throw new ApiError(400, "Only admin can delete group chat")
            }
            const deleteResponse = await chatService.deleteChat(id);
            if (deleteResponse.affected === 1) {
                return res.status(200).json({ message: "chat deleted sucessfully" })
            } else {
                throw new ApiError(500, "Internal server error");
            }

        }

        const participants = chat.participants?.map((participant) => {
            return participant.id;
        })

        if (!participants.includes(req.body.user.id)) {
            throw new ApiError(400, "Participants doesnot belogs to this chat");
        }

        const deleteResponse = await chatService.deleteChat(id);
        if (deleteResponse.affected === 1) {
            return res.status(200).json({ message: "chat deleted sucessfully" })
        } else {
            throw new ApiError(500, "Internal server error");
        }
    })

    renameGroupChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body;
        const chat = req.body.groupChatAdmin;
        const renameResponse = await chatService.renameChat(chat, name)
        return res.status(200).json({ message: "Rename chat sucessfully", renameResponse })
    })

    leaveGroupChat = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { participant } = req.body;
        const chat = await chatService.findChatById(id);

        if (!chat) {
            throw new ApiError(400, "Chat doesnot found");
        }

        if (!chat.isGroupChat) {
            throw new ApiError(400, "Group chat with that id doesnot exists");
        }

        const participantsId = chat.participants.map((participant) => participant.id);

        if (!participantsId.includes(participant)) {
            throw new ApiError(400, "You are not belongs to this chat");
        }

        if (chat.admin.id === req.body.user.id) {
            throw new ApiError(400, "we are implement for admin soon ");
        }

        const removeParticipantResponse = await chatService.removeParticipant(chat, participant);

        if (removeParticipantResponse) {
            res.status(200).json({ message: "Remove user sucessfully", removeParticipantResponse })
        } else {
            throw new ApiError(500, "Internal server error")
        }
    })
}

export default new ChatController();    