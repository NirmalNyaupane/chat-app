import axios, { AxiosResponse } from "axios";
import { IUser } from '@/types/user/userType';

const getCurrentUserApi = async (): Promise<AxiosResponse<IUser | null>> => {
    return axios.get("/user/current-user")
}

export { getCurrentUserApi }