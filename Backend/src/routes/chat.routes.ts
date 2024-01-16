import { Router } from 'express';
import chatController from '../controllers/chat.controller';
import verifyJwt from '../middlewares/auth.middleware';
import chatAdminAccess from '../middlewares/chatadmin.middleware';
import RequestValidator from '../middlewares/validators.middleware';
import { AddParticipantsValidation, GroupChatValidation, RemoveParticipantsValidation, RenameGroupChatValidation } from '../validators/chat.validator';
import { ValidateParamId } from '../validators/common.validator';
const router = Router();

//:id is a id of receiver
router.route("/c/:id").post(verifyJwt, RequestValidator.validate(ValidateParamId, "param"), chatController.createPrivateChat);
router.route("/groupchat")
    .post(verifyJwt, RequestValidator.validate(GroupChatValidation, "body"), chatController.createGroupChat);


//:id is a id of group chat 
router.route("/groupchat/add-participant/:id")
    .post(verifyJwt, RequestValidator.validate(ValidateParamId, "param"), RequestValidator.validate(AddParticipantsValidation, "body"), chatAdminAccess, chatController.addParticipants);


//:id is id of group chat
router.route("/groupchat/remove-participants/:id")
    .post(verifyJwt, RequestValidator.validate(ValidateParamId, "param"), RequestValidator.validate(RemoveParticipantsValidation, "body"), chatAdminAccess, chatController.removeParticipants);

//:id is id of chat
router.route("/:id").delete(verifyJwt, RequestValidator.validate(ValidateParamId, "param"), chatController.deleteChat)

//:id is a id of chat
router.route("/groupchat/:id").patch(verifyJwt, RequestValidator.validate(ValidateParamId, "param"), RequestValidator.validate(RenameGroupChatValidation,"body"),chatAdminAccess, chatController.renameGroupChat)
export default router;