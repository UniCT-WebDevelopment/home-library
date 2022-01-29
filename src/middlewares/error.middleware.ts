import { logger } from "../config/logger";
import { Request, Response, NextFunction } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status";
import CustomError from "../utils/CustomError.util";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    message,
    statusCode = err.statusCode || INTERNAL_SERVER_ERROR,
  }: CustomError = err;

  const response = {
    code: statusCode,
    message,
  };

  res.status(statusCode).send(response);
  // Logging into error stdout

  logger.error(response);
};
