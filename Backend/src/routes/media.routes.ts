import { Router } from "express";
import uploadFileMiddleWares from "../middlewares/multer.middleware";
import mediaController from "../controllers/media.controller";

const router = Router();
router.route("/").post(uploadFileMiddleWares, mediaController.insertMedia);

export default router;
