import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

class UserValidator{
    @IsNotEmpty()
    @IsUUID()
    mediaId:string;
}

class FindUserForChatValidation{
    @IsNotEmpty()
    @IsEmail()
    email:string;
}

export {UserValidator, FindUserForChatValidation}