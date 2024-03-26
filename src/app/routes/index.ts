import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { adminRoutes } from "../modules/Admin/admin.routes";
import { authRouter } from "../modules/Auth/auth.routes";

const router = express.Router();
const moduleRoute = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
export default router;
