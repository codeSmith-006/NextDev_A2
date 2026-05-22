import type { Request, Response } from "express";
import { issuesServices } from "./issues.services";
import {
  errorResponse,
  successResponse,
} from "../../utility/sendResponse/sendResponse";

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

export const issuesController = {
  createIssues,
};
