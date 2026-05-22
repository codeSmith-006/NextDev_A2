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
    const getUserResponse = await issuesServices.getIssuesFromDB(req.query);

    res.status(200).json({
      success: true,
      data: getUserResponse,
    });
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
};

// get single issue by id
const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const singleIssue = await issuesServices.getSingleIssue(id);
    res.status(200).json({
      success: true,
      data: singleIssue,
    });
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
};
export const issuesController = {
  createIssues,
  getIssues,
  getSingleIssue,
};
