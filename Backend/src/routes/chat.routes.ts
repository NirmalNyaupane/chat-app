import { Router } from 'express';
import chatController from '../controllers/chat.controller';
import verifyJwt from '../middlewares/auth.middleware';
import RequestValidator from '../middlewares/validators.middleware';
import { ValidateParamId } from '../validators/common.validator';
import { GroupChatValidation } from '../validators/chat.validator';
const router = Router();

//:id is a id of receiver
router.route("/c/:id").post(verifyJwt, RequestValidator.validate(ValidateParamId, "param"), chatController.createPrivateChat);
router.route("/groupchat")
    .post(verifyJwt, RequestValidator.validate(GroupChatValidation, "body"), chatController.createGroupChat)
export default router;