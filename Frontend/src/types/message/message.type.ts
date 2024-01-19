import { IChat } from "../chat/chat.type"
import { PaginatedResponse } from "../generics/panignation"
import { IUser } from "../user/userType"

export interface MessageCombine extends IMessage{
    chat: IChat
    sender: IUser
}
export interface IMessage {
    id: string
    createdAt: string
    deletedAt: string
    updatedAt: string
    content: string
}

export type MessageResponse=PaginatedResponse<MessageCombine>;