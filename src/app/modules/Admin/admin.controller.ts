import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendRespons from "../../../shared/sendRespons";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const getAllAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await adminService.getAllAdminFromDB(filters, options);
  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrive successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminService.getByIdFromDB(id);
  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin single data successfully",
    data: result,
  });
});
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.updateIntoDB(id, req.body);
  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "update successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await adminService.deleteFromDB(id);
  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin deleted successfully",
  });
});

const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.softDeleteFromDB(id);
  sendRespons(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});
export const adminController = {
  getAllAdmin,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
