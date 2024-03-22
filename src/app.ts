import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/User/user.routes";
import { adminRoutes } from "./app/modules/Admin/admin.routes";
import router from "./app/routes";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
const app: Application = express();

app.use(cors());
//purser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Ph Helth Care Server is Running.....",
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found",
    },
  });
});
export default app;
