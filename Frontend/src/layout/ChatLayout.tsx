'use client'
import ChatSideBar from "@/components/chat/ChatSideBar"
import { AUTH_COOKIE_NAME } from "@/constants/config";
import { IUser } from "@/types/user/userType";
import { getCookie } from "@/utils/cookie";
import { useEffect, useState } from "react"
import { AuthContext } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { getCurrentUserApi } from "@/service/user/user.service";
import useCustomToast from "@/hooks/useToast";
import { showError } from "@/utils/helper";
const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [accessToken, setAccessToken] = useState<string | null | undefined>(getCookie(AUTH_COOKIE_NAME ?? "") ?? "");
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const toast = useCustomToast();
    const { mutate, isPending} = useMutation({
        mutationFn: getCurrentUserApi,
        onSuccess: (data) => {
            if (data.status === 200) {
                setCurrentUser(data.data);
            }
        },
        onError: (error: AxiosError<any, any>) => {
            toast.error(showError(error))
        }
    })



    useEffect(() => {
        if (!accessToken) {
            router.push("/")
        }
        if (accessToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            mutate()
        }
    }, [accessToken]);

    if(isPending){
        return <p>Loading....</p>
    }
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            <ChatSideBar />
            {children}
        </AuthContext.Provider>
    )
}

export default ChatLayout;