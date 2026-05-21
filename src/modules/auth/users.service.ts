import { pool } from "../../db/connectDB";
import config from "../../utility/env_config";
import { errorResponse } from "../../utility/sendResponse/sendResponse";
import type { ILoginUser, IUsers } from "./users.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// create users service
const createUsersIntoDB = async (payload: IUsers) => {
  const { name, email, password, role } = payload;
  // console.log(name, email, password, role);

  // check the roles is in between 'contributor' or 'maintainer'
  const allowedRoles = ["contributor", "maintainer"];
  if (!allowedRoles.includes(role)) {
    throw new Error("Roles must be contributor or maintainer");
  }

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // insert data into database
  const insertData = await pool.query(
    `
    INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, COALESCE($4, 'contributor')) RETURNING id, name, email, role, created_at, updated_at
    `,
    [name, email, hashedPassword, role],
  );

  return insertData.rows[0];
};

// login user with email and password and return jwt token
const loginUserDB = async (payload: ILoginUser) => {
  const { email, password } = payload;

  // get the user from the database based on the response email
  const user = await pool.query(
    `
    SELECT * FROM users  WHERE email=$1
    `,
    [email],
  );
  // checks first the user exist or not in the database
  if (user.rowCount === 0) {
    throw new Error("User not found");
  }

  // decode and compare the response password with database hashed password
  const isMatched = await bcrypt.compare(password, user.rows[0].password);

  if (!isMatched) {
    throw new Error("Invalid Credentials");
  }

  // delete password field from user payload from the database
  delete user.rows[0].password;

  // jwt payload
  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    role: user.rows[0].role,
  };
  // now create the jwt token from jsonwebtoken
  const token = jwt.sign(jwtPayload, config.jwt_secret, { expiresIn: "1d" });

  const response = {
    data: {
      token: token,
      user: user.rows[0],
    },
  };

  return response;
};

// export services of users
export const usersServices = {
  createUsersIntoDB,
  loginUserDB,
};
