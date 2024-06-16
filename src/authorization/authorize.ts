import jwt from "jsonwebtoken";
import User from "../models/user";

const _SecretToken = "VeryTopSecretKey.UseRandomStringOfLongLength";
const _TokenExpiryTime = "24h";

export const authorize = function (roles: string[] = []) {
  if (!Array.isArray(roles)) roles = [roles];

  return (req : any, res : any, next : any) => {
    function sendError(msg: string) {
      return req.res.status(403).json({
        message: msg,
      });
    }

    try {
      const token = req.headers["Authorization"] || req.headers["authorization"];

      if (!token) return sendError("Error: No Token"); // Token does not exist
      if (token.indexOf("Bearer") !== 0) return sendError("Error: Token format invalid"); // Wrong format

      const tokenString = token.split(" ")[1];
      jwt.verify(tokenString, _SecretToken, (err: any, decodedToken: any) => {
        if (err) {
          console.log(err);
          return sendError("Error: Broken Or Expired Token");
        }

        if (!decodedToken || !decodedToken.usertype) return sendError("Error: Role missing");
        const userRole = decodedToken.usertype;
        if (!roles.includes(userRole))
          return sendError("Error: User not authorized");

        req.user = decodedToken;
        next();
      });
    } catch (err) {
      console.log(err);
      return req.res.send.status(500).json({ message: "Server Error Occured" });
    }
  };
};

export const issueToken = function (user: any) {
  var token = jwt.sign({ ...user, iss: "Node-Auth" }, _SecretToken, {
    expiresIn: _TokenExpiryTime,
  });
  return token;
};

export const Roles = {
  Student: ["student"],
  Mentor: ["mentor"],
  Admin: ["admin"],
  All: ["student", "mentor", "admin"],
};