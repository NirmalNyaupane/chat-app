import { Router } from 'express';
import userController from '../controllers/user.controller';
import verifyJwt from '../middlewares/auth.middleware';
import RequestValidator from '../middlewares/validators.middleware';
import { FindUserForChatValidation } from '../validators/user.validator';
const router = Router();

router.route("/current-user").get(verifyJwt, userController.findCurrentUser)
router.route("/update-profile-picture").post(verifyJwt, userController.updateProfilePicture)
router.route("/find-user").get(verifyJwt, RequestValidator.validate(FindUserForChatValidation, "body"), userController.findUserForChat);
export default router;