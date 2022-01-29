import { NextFunction } from "express";
import httpStatus from "http-status";
import passport from "passport";
import CustomError from "../utils/CustomError.util";

/**
 * From passport DOC: If authentication failed, user will be set to false. If an exception occurred, err will be set.
 * An optional info argument will be passed, containing additional details provided by the strategy's verify callback.
 * @param req
 * @param res
 * @param next
 */
export const authenticationMiddleware = (
  req: Express.Request,
  res: Express.Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    function (error, user, info) {
      if (error) {
        throw new CustomError(error, httpStatus.BAD_REQUEST);
      }
      if (!user) {
        throw new CustomError(info, httpStatus.UNAUTHORIZED);
      }

      req.locals = { user };
      return next(); // continue to next middleware if no error.
    }
  )(req, res, next);
};
