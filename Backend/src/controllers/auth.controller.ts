import { NextFunction, Request, Response } from "express";
import authService from "../services/auth/auth.service";
import commonService from "../services/common.service";
import otpService from "../services/otp/otp.service";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/AsyncHandler";
import SendMail from "../utils/SendingMail";
import { isHashValueCorrect, otpGenerator } from "../utils/helper";

class AuthController {
  //  This controller handle the user registration
  registerUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userResponse = await authService.register(req.body);

      //generate otp
      const otp = otpGenerator();

      //save otp on otp entity
      const otpResponse = await otpService.insert(otp.toString(), userResponse);

      if (otpResponse) {
        SendMail({
          receiverEmail: req.body.email,
          subject: "email verification",
          name: req.body.name,
          otp: otp,
        });
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

  initializePassordReset = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
      const user = await commonService.checkUserIsExitOrNot(email);
      if (!user) {
        throw new ApiError(400, "Email is not registered");
      }

      //generate otp
    }
  );
}
export default new AuthController();
