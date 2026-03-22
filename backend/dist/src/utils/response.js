"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendsuccess = void 0;
const sendsuccess = (res, message, data, statusCode = 200) => {
    const response = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};
exports.sendsuccess = sendsuccess;
const sendError = (res, message, statusCode = 400, error) => {
    const response = {
        success: false,
        message,
        error,
    };
    return res.status(statusCode).json(response);
};
exports.sendError = sendError;
//# sourceMappingURL=response.js.map