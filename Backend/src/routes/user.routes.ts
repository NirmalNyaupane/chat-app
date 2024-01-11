import {Router} from 'express';
import userController from '../controllers/user.controller';
import verifyJwt from '../middlewares/auth.middleware';
const router = Router();

router.route("/current-user").get(verifyJwt, userController.findCurrentUser)


export default router;