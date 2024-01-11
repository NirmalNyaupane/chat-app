import { Request, Response, NextFunction } from "express";
import { mediaService } from "../services/media/media.service";
class MediaController {
  async insertMedia(req: Request, res: Response, next: NextFunction) {
    const response = await mediaService.insert(
      req.file?.originalname ?? "",
      req.file?.mimetype ?? ""
    );

    res.status(200).json(response)
  }
}

const mediaController = new MediaController();
export default mediaController;
