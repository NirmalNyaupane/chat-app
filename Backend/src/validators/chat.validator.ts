import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID, Length, Min } from "class-validator";


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

class RemoveParticipantsValidation {
    @IsNotEmpty()
    @IsUUID()
    participant: string;
}

class RenameGroupChatValidation {
    @IsNotEmpty()
    @IsString()
    @Length(3, 15)
    name: string;
}

export { AddParticipantsValidation, GroupChatValidation, RemoveParticipantsValidation, RenameGroupChatValidation };
