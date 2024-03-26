import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { jwtHelper } from "../../../helpers/jwtHelpers";
import jwt, { Secret } from "jsonwebtoken";
import { UserStatus } from "@prisma/client";
import config from "../../../config";

const loginUser = async (payloads: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payloads.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payloads.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is not matche");
  }
  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );
  console.log(accessToken);
  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

////refresh token related work------------------------------------

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(token, "abcdefg");
  } catch (err) {
    throw new Error("You are not authorized");
  }
  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });
  const accessToken = jwtHelper.generateToken(
    {
      email: isUserExist.email,
      role: isUserExist.role,
    },
    "abcdef",
    "5m"
  );
  return {
    accessToken,
    needPasswordChange: isUserExist.needPasswordChange,
  };
};
export const authService = {
  loginUser,
  refreshToken,
};
