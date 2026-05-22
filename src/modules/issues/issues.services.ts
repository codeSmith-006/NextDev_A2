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
const getIssuesFromDB = async (queryParam?: any) => {
  // for sort parameter
  // applying sorting
  const { sort, type, status } = queryParam;
  let query = `SELECT * FROM issues`;

  // for param = type
  if (type === "bug") {
    query += ` WHERE type='bug'`;
  }

  if (type === "feature_request") {
    query += ` WHERE type='feature_request'`;
  }

  // for param = status
  if (status === "open") {
    query += ` WHERE status='open'`;
  } else if (status === "in_progress") {
    query += ` WHERE status='in_progress'`;
  } else if (status === "resolved") {
    query += ` WHERE status='resolved'`;
  }

  // for param = sort
  if ((sort === undefined || sort === "newest") && sort !== "oldest") {
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

// get issues by id
const getSingleIssue = async (id: number) => {
  const issue = await pool.query(
    `
    SELECT * FROM issues WHERE id=$1
    `,
    [id],
  );

  const issueReporter = await pool.query(
    `
      SELECT id, name, role FROM users WHERE id=$1
      `,
    [issue.rows[0].reporter_id],
  );

  // now delete reporter_id from the issue and add reporter object
  issue.rows[0].reporter = issueReporter.rows[0];

  const formattedIssues = {
    id: issue.rows[0].id,
    title: issue.rows[0].title,
    description: issue.rows[0].description,
    type: issue.rows[0].type,
    status: issue.rows[0].status,

    reporter: {
      id: issue.rows[0].reporter.id,
      name: issue.rows[0].reporter.name,
      role: issue.rows[0].reporter.role,
    },

    created_at: issue.rows[0].created_at,
    updated_at: issue.rows[0].updated_at,
  };

  return formattedIssues;
};
export const issuesServices = {
  createIssueIntoDB,
  getIssuesFromDB,
  getSingleIssue,
};
