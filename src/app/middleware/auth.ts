import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import { jwtHelper } from "../../helpers/jwtHelpers";
import config from "../../config";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "forbidden");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default auth;
