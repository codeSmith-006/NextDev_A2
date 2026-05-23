import type { Request, Response } from "express";
import { issuesServices } from "./issues.services.js";
import {
  errorResponse,
  successResponse,
} from "../../utility/sendResponse/sendResponse.js";

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

// update the issue for only allowed for person's issue or the maintainer
const updateIssue = async (req: Request, res: Response) => {
  try {
    const updateIssueResponse = await issuesServices.updateIssueService(
      req.body,
      req.headers,
      req.params.id,
    );

    // console.log(updateIssueResponse[0])
    successResponse(
      res,
      200,
      "Issue updated successfully",
      updateIssueResponse,
    );
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
};

// delete method for delete issues
const deleteIssues = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteIssuesResponse = await issuesServices.deleteIssuesFromDB(id);

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
};

export const issuesController = {
  createIssues,
  getIssues,
  getSingleIssue,
  updateIssue,
  deleteIssues,
};
