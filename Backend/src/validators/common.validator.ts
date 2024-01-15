import { IsUUID } from "class-validator";

class ValidateParamId{
    @IsUUID()
    id:string;
}

export {ValidateParamId};