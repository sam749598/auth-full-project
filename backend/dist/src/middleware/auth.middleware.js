"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticate = void 0;
const response_js_1 = require("../utils/response.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return (0, response_js_1.sendError)(res, "Unauthorized", 401, "UNAUTHORIZED");
    }
    ;
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_js_1.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return (0, response_js_1.sendError)(res, "Token has expired", 401, "TOKEN_EXPIRED");
        }
        return (0, response_js_1.sendError)(res, "Invalid token", 401, "INVALID_TOKEN");
    }
};
exports.authenticate = authenticate;
const authorizeRoles = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return (0, response_js_1.sendError)(res, "Access denied", 403, "FORBIDDEN");
    }
    next();
};
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=auth.middleware.js.map