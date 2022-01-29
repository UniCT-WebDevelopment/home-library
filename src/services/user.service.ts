import httpStatus from "http-status";
import User, { IUser } from "../models/user.model";
import CustomError from "../utils/CustomError.util";
import { generateAccessToken } from "../utils/token.utils";
import bcrypt from "bcrypt";

/**
 * This method allow creation of new user
 * @param user
 * @returns
 */
const createNewUser = async (user: IUser) => {
  const newUser = {
    ...user,
    password: await bcrypt.hash(user.password, 10),
  };
  return User.create(newUser);
};

/**
 * Service with check if email and password are correct
 * when user attempt to login into the application
 * @param email
 * @param password
 */
const login = async (email: string, password: string) => {
  const user: IUser | null = await User.findOne({ email: email });
  if (user && (await user.comparePassword(password))) {
    const accessToken = generateAccessToken(user);
    return {
      email: user.email,
      token: accessToken,
    };
  } else {
    throw new CustomError(
      "Email or password are wrong!",
      httpStatus.UNAUTHORIZED
    );
  }
};

export default {
  login,
  createNewUser,
};
