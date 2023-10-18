import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { env } from "../config";
const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: env.NODE_ENV === "development" ? err.stack : null,
  });
};

export default errorHandler;
