import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const jwtStrategyOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Looks for the JWT in the auth header with bearer
};

export const strategy = new JWTStrategy(jwtStrategyOptions, function (
  jwt_payload: any,
  done: (arg0: null, arg1: boolean) => any
) {
  return done(null, jwt_payload.user);
});
