import {Router} from 'express';
import userController from '../controllers/user.controller';
import verifyJwt from '../middlewares/auth.middleware';
const router = Router();

router.route("/current-user").get(verifyJwt, userController.findCurrentUser)
router.route("/update-profile-picture").post(verifyJwt, userController.updateProfilePicture)

export default router;