import type { NextFunction, Request, Response } from "express";
import type { IIssueReporter } from "../modules/issues/issues.interface.js";
import decodedJWT from "../utility/JWT/decodeJWT.js";
import { pool } from "../db/connectDB.js";
import { errorResponse } from "../utility/sendResponse/sendResponse.js";

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log(payload, auth_token)
    const auth_token = req.headers;
    const paramId = await req.params.id;
    const id = Number(paramId);
    const { authorization } = auth_token;
    const decoded = decodedJWT(authorization);
    const isMaintainer = decoded.role === "maintainer";

    // destructure the payload
    const { title, description, type } = req.body;

    // for implement this, we have check that we get token that gives us the user who wanna update this method
    // so first we check that the user who request this , does he has really posted something with the id from the param id?
    // or we check that the user is a maintainer or not, if yes then ok he can update .

    // get the all issues of the user who requested it
    const { rows } = await pool.query(
      `
        SELECT * FROM issues WHERE reporter_id=$1
        `,
      [decoded.id],
    );

    const issuesOfRequestedUser: IIssueReporter[] = rows;
    // console.log(issuesOfRequestedUser)
    // now find the post for request to edit from the issuesOfReqUser
    const issueToUpdate = issuesOfRequestedUser.find(
      (issue: IIssueReporter) => issue.id == id,
    );

    // if the id of the issue not matched from the issues by the user then error
    // if (issueToUpdate === undefined) {
    //   throw new Error("Enter a valid id!");
    // }

    if (isMaintainer || issueToUpdate) {
      next();
    } else {
      throw new Error("Unauthorized request");
    }
  } catch (error: any) {
    errorResponse(res, 400, error.message, error);
  }
};
