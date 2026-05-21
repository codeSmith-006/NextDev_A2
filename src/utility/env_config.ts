import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

// config object for each connection
const config = {
  connection_string: process.env.DB_CS as string,
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET as string,
};

export default config;
