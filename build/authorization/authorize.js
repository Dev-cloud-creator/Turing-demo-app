"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.issueToken = exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _SecretToken = "VeryTopSecretKey.UseRandomStringOfLongLength";
const _TokenExpiryTime = "24h";
const authorize = function (roles = []) {
    if (!Array.isArray(roles))
        roles = [roles];
    return (req, res, next) => {
        function sendError(msg) {
            return req.res.status(403).json({
                message: msg,
            });
        }
        try {
            const token = req.headers["Authorization"] || req.headers["authorization"];
            if (!token)
                return sendError("Error: No Token"); // Token does not exist
            if (token.indexOf("Bearer") !== 0)
                return sendError("Error: Token format invalid"); // Wrong format
            const tokenString = token.split(" ")[1];
            jsonwebtoken_1.default.verify(tokenString, _SecretToken, (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    return sendError("Error: Broken Or Expired Token");
                }
                if (!decodedToken || !decodedToken.usertype)
                    return sendError("Error: Role missing");
                const userRole = decodedToken.usertype;
                if (!roles.includes(userRole))
                    return sendError("Error: User not authorized");
                req.user = decodedToken;
                next();
            });
        }
        catch (err) {
            console.log(err);
            return req.res.send.status(500).json({ message: "Server Error Occured" });
        }
    };
};
exports.authorize = authorize;
const issueToken = function (user) {
    var token = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, user), { iss: "Node-Auth" }), _SecretToken, {
        expiresIn: _TokenExpiryTime,
    });
    return token;
};
exports.issueToken = issueToken;
exports.Roles = {
    Student: ["student"],
    Mentor: ["mentor"],
    Admin: ["admin"],
    All: ["student", "mentor", "admin"],
};
//# sourceMappingURL=authorize.js.map