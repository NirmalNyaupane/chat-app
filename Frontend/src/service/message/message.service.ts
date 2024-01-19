import { MessageResponse } from "@/types/message/message.type";
import axios, { AxiosResponse } from "axios";

interface getChatMessagePayload {
    chatId: string;
    page?: number;
    limit?: number
}

interface sendMessagePayload {
    chatId: string;
    content?: string;
}


const getChatMessage = async ({ chatId, ...param }: getChatMessagePayload): Promise<AxiosResponse<MessageResponse, any>> => {
    return await axios.get(`/message/${chatId}`, {
        params: { ...param }
    })
}

const sendMessageApi = async ({ chatId, content }: sendMessagePayload): Promise<AxiosResponse<string, any>> => {
    // console.log()
    return await axios.post(`/message/${chatId}`, { content: content })
}

export { getChatMessage, sendMessageApi };