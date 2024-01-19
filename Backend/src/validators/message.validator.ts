import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";

class MessageValidator {
    @IsOptional()
    @IsString()
    @Length(2,)
    content: string;

    @IsOptional()
    @IsArray()
    @IsUUID("all", { each: true })
    attatchment: string[];
}

export class UpdateMessageValidator {
    @IsOptional()
    @IsString()
    @Length(2,)
    content: string;
}

export default MessageValidator;