import { NextFunction, Request, Response } from "express";
import { OTPType } from "../constants";
import authService from "../services/auth/auth.service";
import commonService from "../services/common.service";
import otpService from "../services/otp/otp.service";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandler";
import SendMail from "../utils/SendingMail";
import { generateAccessToken } from "../utils/accessToken";
import { isHashValueCorrect, otpGenerator } from "../utils/helper";

class AuthController {


  //  This controller handle the user registration
  registerUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userResponse = await authService.register(req.body);

      //generate otp
      const otp = otpGenerator();

      //save otp on otp entity
      const otpResponse = await otpService.insert(otp.toString(), userResponse, OTPType.EmailVerify, (Date.now() + 1000 * 60));

      if (otpResponse) {
        SendMail({
          receiverEmail: req.body.email,
          subject: "email verification",
          name: req.body.name,
          otp: otp,
          heading: "Email Verification",
          purpose: OTPType.EmailVerify
        });
      } else {
        throw new ApiError(500, "Internal server error");
      }

      const { password, ...remainingInfo } = userResponse;
      return res.status(201).json({
        message:
          "Sucessfully created, please check your account for email verification",
        data: remainingInfo,
      });
    }
  );


  //email verification controller
  emailVerification = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      //check if email is register or not
      const user = await commonService.emailIsRegisterOrNot(req.body.email);

      if (!user) {
        throw new ApiError(400, "Email is not registered");
      }

      const otp = await otpService.find(user);
      if (!otp?.otp) {
        throw new ApiError(439, "Otp is expired");
      }

      const isOtpValid = await isHashValueCorrect(otp.otp, req.body.otp);

      if (!isOtpValid) {
        throw new ApiError(400, "Invalid otp");
      }
      const updateResponse = await authService.verifyEmail(user.id);
      if (updateResponse.affected === 1) {
        return res
          .status(200)
          .json({ message: "Account verified sucessfully" });
      } else {
        throw new ApiError(500, "Internal server error");
      }
    }
  );


  resendOtp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await commonService.emailIsRegisterOrNot(email);
    if (!user) {
      throw new ApiError(400, "Internal server error");
    }

    //check user is verified or not
    if (user.isVerified) {
      throw new ApiError(400, "User is already verified")
    }


    //only allow resend otp after 1seconds
    const otp = await otpService.find(user);
    if (otp?.otp) {
      throw new ApiError(439, "Allow after one second");
    }
  })


  initializePassordReset = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
      const user = await commonService.emailIsRegisterOrNot(email);
      if (!user) {
        throw new ApiError(400, "Email is not registered");
      }

      //if email is not verified
      if (!user.isVerified) {
        //generate otp
        const otp = otpGenerator();

        //save otp on db
        const otpResponse = await otpService.insert(otp.toString(), user, OTPType.EmailVerify, (Date.now() + 1000 * 60));

        //send otp on message
        if (!otpResponse) {
          throw new ApiError(500, "Internal server error");
        }
        SendMail({
          receiverEmail: req.body.email,
          subject: "Email verification",
          name: user.name,
          otp: otp,
          heading: "Reset Password",
          purpose: OTPType.EmailVerify
        });

        throw new ApiError(400, "Email is not verified please check your email for verification")
      }


      //generate otp
      const otp = otpGenerator();

      //save otp on db
      const otpResponse = await otpService.insert(otp.toString(), user, OTPType.ResetPassword, (Date.now() + 1000 * 60 * 5));

      //send otp on message
      if (!otpResponse) {
        throw new ApiError(500, "Internal server error");
      }
      SendMail({
        receiverEmail: req.body.email,
        subject: "forget password",
        name: user.name,
        otp: otp,
        heading: "Reset Password",
        purpose: OTPType.ResetPassword
      });

      res.status(200).json({ message: "Otp is send to your email" })
    }
  );

  finalizePasswordReset = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //check email is registered or not
    const { email } = req.body;

    const user = await commonService.emailIsRegisterOrNot(email);

    if (!user) {
      throw new ApiError(400, "Email is not registered");
    }

    //verify otp 
    const otp = await otpService.find(user);
    if (!otp?.otp) {
      throw new ApiError(439, "Otp is expired");
    }

    const isOtpValid = await isHashValueCorrect(otp.otp, req.body.otp);
    if (!isOtpValid) {
      throw new ApiError(400, "Invalid otp");
    }

    const updateResponse = await authService.resetPassword(user, req.body.newPassword);
    if (updateResponse) {
      return res
        .status(200)
        .json({ message: "Password changed sucessfully", data: updateResponse });
    } else {
      throw new ApiError(500, "Internal server error");
    }
  })


  login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await commonService.emailIsRegisterOrNot(req.body.email);
    if (!user) {
      throw new ApiError(400, "Email is not registered")
    }

    //check password
    const isPasswordCorrect = await isHashValueCorrect(user.password, req.body.password)
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid credentials")
    }
    const jwt = generateAccessToken(user.id);
    const reponse = {
      id: user.id,
      isVerified: user.isVerified,
      accessToken: jwt
    }

    return res.status(200).json(reponse);
  })
}
export default new AuthController();
