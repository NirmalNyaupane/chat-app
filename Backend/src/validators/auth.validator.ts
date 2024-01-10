import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Length,
  Max,
  Min,
} from "class-validator";

class RegisterUserValidation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

class EmailVerificationValidatior {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 5)
  otp: number;
}

class InitializePasswordResetValidator {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
export {
  RegisterUserValidation,
  EmailVerificationValidatior,
  InitializePasswordResetValidator,
};
