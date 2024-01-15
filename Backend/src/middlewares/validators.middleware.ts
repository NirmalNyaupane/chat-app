import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

type Validation = "body" | "param" | "query";

class RequestValidator {
  private static body(req: Request, validationClass: any) {
    return plainToClass(validationClass, req.body)
  }

  private static param(req: Request, validationClass: any) {
    console.log(req.params)
    return plainToClass(validationClass, req.params)
  }

  private static query(req: Request, validationClass: any) {
    return plainToClass(validationClass, req.query)
  }


  static validate(ValidationClass: any, validationType: Validation) {
    return async (req: Request, res: Response, next: NextFunction) => {
      // const convertedObject = plainToClass(ValidationClass, req.body); //same 
      let convertedObject: any[] = [];

      if (validationType === "body") {
        convertedObject = RequestValidator.body(req, ValidationClass);
      }

      if (validationType === "param") {
        convertedObject = RequestValidator.param(req, ValidationClass) as any[];
      }

      if (validationType === "query") {
        convertedObject = RequestValidator.query(req, ValidationClass) as any[]
      }


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
  }
}

export default RequestValidator;
