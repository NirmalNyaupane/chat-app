import { Router } from "express";
import authController from "../controllers/auth.controller";
import RequestValidator from "../middlewares/validators.middleware";
import {
  EmailVerificationValidatior,
  FinalizePasswordResetValidator,
  InitializePasswordResetValidator,
  LoginValidator,
  RegisterUserValidation
} from "../validators/auth.validator";
const router = Router();

router
  .route("/register")
  .post(
    RequestValidator.validate(RegisterUserValidation, "body"),
    authController.registerUser
  );
router
  .route("/email-verification")
  .post(
    RequestValidator.validate(EmailVerificationValidatior, "body"),
    authController.emailVerification
  );

router.route('/resend-otp').post(RequestValidator.validate(InitializePasswordResetValidator, "body"), authController.resendOtp)

router
  .route("/initialize-password-reset")
  .post(
    RequestValidator.validate(InitializePasswordResetValidator, "body"),
    authController.initializePassordReset
  );
router.route("/finalize-password-reset").post(RequestValidator.validate(FinalizePasswordResetValidator, "body"), authController.finalizePasswordReset)
router.route("/login").post(RequestValidator.validate(LoginValidator, "body"), authController.login)
export default router;
