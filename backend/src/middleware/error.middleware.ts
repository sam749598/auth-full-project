import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";
import { sendError } from "../utils/response.js";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=>{

    // Known operational errors
  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  };

  // Prisma record not found
  if ((err as any).code === "P2025") {
    return sendError(res, "Record not found", 404, "NOT_FOUND");
  };

  // Unknown errors
  console.error("Unhandled error:", err);
  return sendError(res, "Internal server error", 500, "INTERNAL_SERVER_ERROR");
  
};





