import { ChatResponse } from "@/types/chat/chat.type";
import axios, { AxiosResponse } from "axios";
interface ChatPayload {
    limit?: number;
    page?: number;
    search?: string
}
const getAllChats = async (ChatPayload: ChatPayload): Promise<AxiosResponse<ChatResponse, any>> => {
    return axios.get("/chat", {
        params: { ...ChatPayload }
    })
}

export { getAllChats };
