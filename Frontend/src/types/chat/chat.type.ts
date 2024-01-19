import { PaginatedResponse } from "../generics/panignation"
import { IMessage } from "../message/message.type"
import { IUser } from "../user/userType"


export interface ChatCombine extends IChat {
    participants: IUser[]
    admin: IUser
    lastMessage: IMessage
}

export interface IChat {
    id: string
    createdAt: string
    deletedAt: any
    updatedAt: string
    name: string
    isGroupChat: boolean
}

export type ChatResponse = PaginatedResponse<ChatCombine>