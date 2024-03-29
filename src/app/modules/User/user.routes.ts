import express from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("ADMIN", "SUPER_ADMIN"), userController.createAdmin);
export const userRoutes = router;
