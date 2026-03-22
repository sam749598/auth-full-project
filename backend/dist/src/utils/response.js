export const sendsuccess = (res, message, data, statusCode = 200) => {
    const response = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};
export const sendError = (res, message, statusCode = 400, error) => {
    const response = {
        success: false,
        message,
        error,
    };
    return res.status(statusCode).json(response);
};
//# sourceMappingURL=response.js.map