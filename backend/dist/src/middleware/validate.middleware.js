"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod"); // 
const response_js_1 = require("../utils/response.js");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const message = error.issues[0]?.message || "Validation failed";
            return (0, response_js_1.sendError)(res, message, 422, "VALIDATION_ERROR");
        }
        next(error);
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware.js.map