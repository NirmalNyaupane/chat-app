import { LoginUserType, RegisterUserType, LoginResponse } from "@/types/auth/AuthType"
import axios, { AxiosResponse } from "axios"
const userRegisterApi = async (payload: RegisterUserType): Promise<AxiosResponse<any, any>> => {
    return await axios.post("/auth/register", payload)
}


const loginUserApi = async (payload: LoginUserType): Promise<AxiosResponse<LoginResponse, any>> => {
    return await axios.post("/auth/login", payload)
}

const otpVerificationApi = async (payload: { otp: string, email: string }): Promise<AxiosResponse<{ message: string }, any>> => {
    return await axios.post("/auth/email-verification", payload)
}

const resendOtpApi = async (email: string): Promise<AxiosResponse<{ message: string }, any>> => {
    return await axios.post("auth/resend-otp", { email })
}

export { userRegisterApi, loginUserApi, otpVerificationApi, resendOtpApi }