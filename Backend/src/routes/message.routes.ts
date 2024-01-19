import { Router } from 'express';
import verifyJwt from '../middlewares/auth.middleware';
import RequestValidator from '../middlewares/validators.middleware';
import { ValidateParamId } from '../validators/common.validator';
import MessageValidator, { UpdateMessageValidator } from '../validators/message.validator';
import messageController from '../controllers/message.controller';
const router = Router();

//send message
//id is a id of chat
router.use(verifyJwt)
router.route("/:id")
    .post(RequestValidator.validate(ValidateParamId, "param"), RequestValidator.validate(MessageValidator, "body"), messageController.sendMessage)
    .get(RequestValidator.validate(ValidateParamId, "param"), messageController.getMessage)
    .delete(RequestValidator.validate(ValidateParamId, "param"), messageController.deleteMessage)
    .patch(RequestValidator.validate(ValidateParamId, "param"),RequestValidator.validate(UpdateMessageValidator,"body"), messageController.updateMessage)
export default router;
