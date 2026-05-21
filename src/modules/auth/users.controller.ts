import type { Request, Response } from "express";
import { usersServices } from "./users.service";
import {
  errorResponse,
  successResponse,
} from "../../utility/sendResponse/sendResponse";

// create user payload method
const createUser = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const user = await usersServices.createUsersIntoDB(req.body);
    successResponse(res, 201, "User registered successfully", user);
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
};

// login user method
const loginUser = async (req: Request, res: Response) => {
  try {
    const loggedUserResponse = await usersServices.loginUserDB(req.body);
    successResponse(res, 200, "Login successful", loggedUserResponse.data);
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
};

//
export const authController = {
  createUser,
  loginUser,
};
