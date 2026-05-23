import { Pool } from "pg";
import config from "../utility/env_config.js";

export const pool = new Pool({
  connectionString: config.connection_string,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 10000,
});

// initialize the db
export const initDB = async () => {
  try {
    // creating users table
    console.log("creating users table");
    await pool.query(`
       CREATE TABLE IF NOT EXISTS users(
       id SERIAL PRIMARY KEY,
       name VARCHAR(20) NOT NULL,
       email VARCHAR(50) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
       )
        `);
    console.log("query running");

    // creating issues table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues(
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,

      description TEXT NOT NULL CHECK(LENGTH(description) >= 20),
      type VARCHAR(20) NOT NULL CHECK(type IN ('bug', 'feature_request')),

      status VARCHAR(20) NOT NULL CHECK(status IN ('open', 'in_progress', 'resolved')),

      reporter_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `);

    console.log("issues query running");
  } catch (error: any) {
    throw new Error("DB ERROR: ", error.message);
  }
};
