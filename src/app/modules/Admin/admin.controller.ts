import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    // console.log(req.query);

    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    console.log("options", options);
    const result = await adminService.getAllAdminFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin retrive successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
      error: err,
    });
  }
};
const getByIdFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const result = await adminService.getByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin retrive successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
      error: err,
    });
  }
};
const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.updateIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
      error: err,
    });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminService.deleteFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Somthing went wrong",
      error: err,
    });
  }
};
export const adminController = {
  getAllAdmin,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
