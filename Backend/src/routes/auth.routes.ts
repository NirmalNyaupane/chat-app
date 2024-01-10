import { Router } from "express";
import requestBodyValidator from "../middlewares/validators.middleware";
import {
  RegisterUserValidation,
  EmailVerificationValidatior,
  InitializePasswordResetValidator,
  FinalizePasswordResetValidator,
  LoginValidator
} from "../validators/auth.validator";
import authController from "../controllers/auth.controller";
const router = Router();

router
  .route("/register")
  .post(
    requestBodyValidator(RegisterUserValidation),
    authController.registerUser
  );
router
  .route("/email-verification")
  .post(
    requestBodyValidator(EmailVerificationValidatior),
    authController.emailVerification
  );

router.route('/resend-otp').post(requestBodyValidator(InitializePasswordResetValidator), authController.resendOtp)

router
  .route("/initialize-password-reset")
  .post(
    requestBodyValidator(InitializePasswordResetValidator),
    authController.initializePassordReset
  );
router.route("/finalize-password-reset").post(requestBodyValidator(FinalizePasswordResetValidator), authController.finalizePasswordReset)
router.route("/login").post(requestBodyValidator(LoginValidator), authController.login)
export default router;
