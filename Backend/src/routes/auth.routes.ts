import { Router } from "express";
import requestBodyValidator from "../middlewares/validators.middleware";
import {
  RegisterUserValidation,
  EmailVerificationValidatior,
  InitializePasswordResetValidator,
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

router
  .route("/initialize-password-reset")
  .post(
    requestBodyValidator(InitializePasswordResetValidator),
    authController.initializePassordReset
  );
// router.route("/resend-otp")
// router.route("/initialize-password-reset")

/**
 * email -> if email, otp generate send
 * finalize -> email, new_password, code
 */
// router.route("/finalize-password-reset") //code
export default router;
