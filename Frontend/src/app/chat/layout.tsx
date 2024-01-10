import ChatSideBar from "@/components/chat/ChatSideBar";
const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex gap-3 overflow-hidden">
            <ChatSideBar />
            {children}
        </main>
    )


}

export default ChatLayout;