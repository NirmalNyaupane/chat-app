import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length
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

class FinalizePasswordResetValidator {
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsNotEmpty()
  @Length(5, 5)
  otp: number;

  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;
}

class LoginValidator{
  @IsNotEmpty()
  @IsEmail()
  email:string;

  @IsNotEmpty()
  @IsStrongPassword()
  password:string;
}
export {
  EmailVerificationValidatior,
  InitializePasswordResetValidator,
  RegisterUserValidation,
  FinalizePasswordResetValidator,
  LoginValidator
};
