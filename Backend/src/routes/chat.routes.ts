import { Router } from 'express';
import chatController from '../controllers/chat.controller';
import verifyJwt from '../middlewares/auth.middleware';
import RequestValidator from '../middlewares/validators.middleware';
import { ValidateParamId } from '../validators/common.validator';
const router = Router();

//:id is a id of receiver
router.route("/c/:id").post(verifyJwt, RequestValidator.validate(ValidateParamId, "param"), chatController.createPrivateChat)

export default router;