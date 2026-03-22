import { sendError } from "../utils/response.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return sendError(res, "Unauthorized", 401, "UNAUTHORIZED");
    }
    ;
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return sendError(res, "Token has expired", 401, "TOKEN_EXPIRED");
        }
        return sendError(res, "Invalid token", 401, "INVALID_TOKEN");
    }
};
export const authorizeRoles = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return sendError(res, "Access denied", 403, "FORBIDDEN");
    }
    next();
};
//# sourceMappingURL=auth.middleware.js.map