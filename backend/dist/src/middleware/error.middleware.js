"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_js_1 = require("../utils/AppError.js");
const response_js_1 = require("../utils/response.js");
const errorHandler = (err, req, res, next) => {
    // Known operational errors
    if (err instanceof AppError_js_1.AppError) {
        return (0, response_js_1.sendError)(res, err.message, err.statusCode);
    }
    ;
    // Prisma record not found
    if (err.code === "P2025") {
        return (0, response_js_1.sendError)(res, "Record not found", 404, "NOT_FOUND");
    }
    ;
    // Unknown errors
    console.error("Unhandled error:", err);
    return (0, response_js_1.sendError)(res, "Internal server error", 500, "INTERNAL_SERVER_ERROR");
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map