import jwt from "jsonwebtoken";
import config from "../../utility/env_config";
import { pool } from "../../db/connectDB";
import type { IIssueReporter, IIssues } from "./issues.interface";

// posting issues into database
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

  return insertedIssue.rows[0];
};

// get issues
const getIssuesFromDB = async (sort?: string) => {
  // applying sorting
  let query = `SELECT * FROM issues`;
  if (sort === "newest") {
    query += ` ORDER BY created_at DESC`;
  }

  if (sort === "oldest") {
    query += ` ORDER BY created_at ASC`;
  }

  const issues = await pool.query(query);

  // now fetch each reporter based on the issue
  for (const issue of issues.rows) {
    const issueReporter = await pool.query(
      `
      SELECT id, name, role FROM users WHERE id=$1
      `,
      [issue.reporter_id],
    );

    // now delete reporter_id from the issue and add reporter object
    issue.reporter = issueReporter.rows[0];
  }

  const formattedIssues = issues.rows.map((issue: IIssueReporter) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,

    reporter: {
      id: issue.reporter.id,
      name: issue.reporter.name,
      role: issue.reporter.role,
    },

    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));

  return formattedIssues;
};
export const issuesServices = {
  createIssueIntoDB,
  getIssuesFromDB,
};
