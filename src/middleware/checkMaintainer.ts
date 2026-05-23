import type { NextFunction, Request, Response } from "express";
import decodedJWT from "../utility/JWT/decodeJWT";
import { errorResponse } from "../utility/sendResponse/sendResponse";

export const checkMaintainer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    const decoded = decodedJWT(authorization);
    if (decoded.role !== "maintainer") {
      throw new Error("Unauthorized access");
    }
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
  next();
};
