import { UserRoleEnum } from "@/constants/enum";
import { ApiSucessResponse } from "../generics/ApiGenericsType";

interface IUser {
  id: string
  createdAt: string
  deletedAt: any
  updatedAt: string
  name: string
  email: string
  isVerified: boolean
  profile: any
}

type UserResponse = ApiSucessResponse<IUser>;

export type { IUser, UserResponse }