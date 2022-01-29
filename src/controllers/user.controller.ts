import userService from "../services/user.service";
import express from "express";
/**
 * Controller that allow creation of new user
 * @param req
 * @param response
 */
const signup = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await userService.createNewUser(req.body);
    response.send(user);
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userService.login(email, password);
    response.send(user);
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  login,
};
