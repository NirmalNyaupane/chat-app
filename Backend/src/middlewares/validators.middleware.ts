import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

const requestBodyValidator = (validationClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const convertedObject = plainToClass(validationClass, req.body);
    const validateErrors = await validate(convertedObject);

    if (validateErrors.length === 0) {
      return next();
    }
    const errors: string[] = [];
    validateErrors.forEach((error) => {
      errors.push(...Object.values(error.constraints ?? ""));
    });

    return next(new ApiError(400, "Invalid data", errors));
  };
};

export default requestBodyValidator;
