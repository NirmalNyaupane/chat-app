import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, Length, MinLength, arrayMinSize, isUUID } from "class-validator";


class GroupChatValidation {
    @IsNotEmpty()
    @Length(3, 15)
    name: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(2)
    @IsUUID("all", { each: true })
    participants: string[]
}

class AddParticipantsValidation {
    @IsNotEmpty()
    @IsArray()
    @IsUUID("all", { each: true })
    participants: string[]
}


export { GroupChatValidation, AddParticipantsValidation };