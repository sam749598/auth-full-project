import { ZodError } from "zod"; // 
import { sendError } from "../utils/response.js";
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            const message = error.issues[0]?.message || "Validation failed";
            return sendError(res, message, 422, "VALIDATION_ERROR");
        }
        next(error);
    }
};
//# sourceMappingURL=validate.middleware.js.map