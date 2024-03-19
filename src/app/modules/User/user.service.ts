import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createAdmin = async (data: any) => {
  // console.log({ data });
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transectionClient) => {
    const createUserData = await transectionClient.user.create({
      data: userData,
    });
    const createAdminData = await transectionClient.admin.create({
      data: data.admin,
    });

    return createAdminData;
  });
  return result;
};
export const userService = {
  createAdmin,
};
