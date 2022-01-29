import { IUser } from "../models/user.model";
import jsonwebtoken from "jsonwebtoken";

/**
 * Utils that create new JWT
 * @param user
 */
export const generateAccessToken = (user: IUser) => {
  const JWT_SECRET = process.env.JWT_SECRET || "";
  const JWT_EXPIRED_TIME = process.env.JWT_EXPIRED_TIME || "1000s";
  return jsonwebtoken.sign({ user }, JWT_SECRET, {
    expiresIn: JWT_EXPIRED_TIME,
  });
};
