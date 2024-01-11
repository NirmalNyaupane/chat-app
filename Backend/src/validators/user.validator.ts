import { IsNotEmpty, IsUUID } from "class-validator";

class UserValidator{
    @IsNotEmpty()
    @IsUUID()
    mediaId:string;
}

export {UserValidator}