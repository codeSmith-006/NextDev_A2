import type { Response } from "express";

// for success response
export const successResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// for error response
export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error: unknown,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: error,
  });
};
