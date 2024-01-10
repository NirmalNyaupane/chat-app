import { NextFunction, Request, Response } from "express";
import path from "path";
import { setUpMulter } from "../config/multer.config";
import { MediaType } from "../constants";
import ApiError from "../utils/ApiError";

const uploadFileMiddleWares = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { upload, storageConfig } = setUpMulter();

  const allowedExtension: string[] = [];
  let allowedSize: number = 0;

  upload(req, res, () => {
    const { mediaType } = req.body;

    //if mediaBody is not present in the form body return the message mediaBody is required
    if (!mediaType || !Object.values(MediaType).includes(mediaType)) {
      throw new ApiError(
        400,
        `MediaType is required and allowed media type are ${Object.values(
          MediaType
        ).toString()}`
      );
    }

    //if file is not present in the form data, return file is required message
    if (!req.file) {
      return next(new ApiError(400, "file is required"));
    }

    //for setting allowed extension and allowed file for each fileType
    switch (mediaType) {
      case MediaType.Profile: {
        allowedExtension.push(".jpeg", ".jpg", ".png");
        allowedSize = 1024 * 1024;

        //validate size
        if (req.file?.size && req.file.size > allowedSize) {
          return next(
            new ApiError(
              400,
              `File size is large. Allowed size is atmost ${
                allowedSize / (1024 * 1024)
              }MB`
            )
          );
        }
      }
    }

    //check if file size is less or not
    if (req.file.size > allowedSize) {
      storageConfig._removeFile(req, req.file, (err) => console.log(err));
      return next(
        new ApiError(
          400,
          `Allowed file size is ${allowedSize / (1024 * 1024)}MB`
        )
      );
    }
    //if extension is not matched
    if (!allowedExtension.includes(path.extname(req.file.originalname))) {
      storageConfig._removeFile(req, req.file, (err) => console.log(err));
      return next(
        new ApiError(
          400,
          `Only ${allowedExtension.toString()} files are allowed`
        )
      );
    }

    next();
  });
};

export default uploadFileMiddleWares;
