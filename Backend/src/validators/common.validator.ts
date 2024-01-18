import { IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";

class ValidateParamId {
    @IsUUID()
    id: string;
}
class QueryValidation {
    @IsOptional()
    @IsNumberString()
    page: number;

    @IsOptional()
    @IsNumberString()
    limit: number;

    @IsOptional()
    @IsString()
    search: string;
}
export { QueryValidation, ValidateParamId };
