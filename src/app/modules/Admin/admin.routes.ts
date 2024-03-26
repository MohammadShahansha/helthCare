import express, { NextFunction, Request, Response } from "express";
import { adminController } from "./admin.controller";
import { AnyZodObject, z } from "zod";
import validateRequest from "../../middleware/validateRequest";
import { adminValidateRequest } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidateRequest.updateValidationSchema),
  adminController.updateIntoDB
);
router.delete("/:id", adminController.deleteFromDB);
router.delete("/soft/:id", adminController.softDeleteFromDB);

export const adminRoutes = router;
