import jwt from "jsonwebtoken";
import config from "../env_config.js";
// const decoded = (await jwt.verify(
//     authorization,
//     config.jwt_secret as string,
//   )) as jwt.JwtPayload;

const decodedJWT = (authorization: any) => {
  return jwt.verify(
    authorization,
    config.jwt_secret as string,
  ) as jwt.JwtPayload;
};

export default decodedJWT;
