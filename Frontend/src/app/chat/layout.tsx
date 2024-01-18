import ChatLayout from "@/layout/ChatLayout";
const GlobaChatLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex gap-3 overflow-hidden">
            <ChatLayout>{children}</ChatLayout>
        </main>
    )
}

export default GlobaChatLayout;