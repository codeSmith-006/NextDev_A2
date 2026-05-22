import type { Request, Response } from "express";
import { issuesServices } from "./issues.services";
import {
  errorResponse,
  successResponse,
} from "../../utility/sendResponse/sendResponse";

// posting issue controller
const createIssues = async (req: Request, res: Response) => {
  try {
    const issueCreateResponse = await issuesServices.createIssueIntoDB(
      req.body,
      req.headers,
    );

    // sending success response
    successResponse(
      res,
      201,
      "Issue created successfully",
      issueCreateResponse,
    );
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
};

// get all issues
const getIssues = async (req: Request, res: Response) => {
  try {
    const sort = req.query.sort as string;
    const getUserResponse = await issuesServices.getIssuesFromDB(sort);

    console.log("all issues from controller: ", getUserResponse);
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
};
export const issuesController = {
  createIssues,
  getIssues,
};
