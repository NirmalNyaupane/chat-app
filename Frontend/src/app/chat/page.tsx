import { MessageSquareDashed } from "lucide-react";

const ChatPage = () => {
    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-3 text-gray-600">
            <MessageSquareDashed className="size-36" />
            <h2 className="text-2xl font-bold">No chats selected</h2>
        </div>
    )

}

export default ChatPage;