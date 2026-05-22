import jwt from "jsonwebtoken";
import config from "../../utility/env_config";
import { pool } from "../../db/connectDB";
import type { IIssues } from "./issues.interface";

const createIssueIntoDB = async (payload: IIssues, auth_token: any) => {
  // extract the user payload
  const { title, description, type, status } = payload;
  const { authorization } = auth_token;

  const decoded = (await jwt.verify(
    authorization,
    config.jwt_secret as string,
  )) as jwt.JwtPayload;


  //   insert data into database
  const insertedIssue = await pool.query(
    `
      INSERT INTO issues(title, description, type, status, reporter_id) VALUES($1, $2, $3, COALESCE($4, 'open'), $5) RETURNING *
      `,
    [title, description, type, status, decoded.id],
  );

  return insertedIssue.rows[0]
};

export const issuesServices = {
  createIssueIntoDB,
};
