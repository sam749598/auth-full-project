"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileInput = exports.loginSchema = exports.registrationSchema = void 0;
const zod_1 = require("zod");
exports.registrationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, "Name must be at least 2 characters").optional(),
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string().min(5, "Password must be at least 5 characters"),
        role: zod_1.z.enum(["USER", "ADMIN"]).optional().default("USER"),
    })
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email("Invalid email address"),
        password: zod_1.z.string().min(5, "Password must be at least 5 characters"),
    })
});
// export const updateProfileSchema = z.object({
//     body:z.object({
//          name:z.string().min(2, "Name must be at least 2 characters").optional(),
//          email:z.string().email("Invalid email address").optional(),
//          password:z.string().min(5, "Password must be at least 5 characters").optional(),
//     }),
//     params:z.object({
//        id:z.string().min(2, "Id must be at least 2 characters"),
//     })
// })
exports.updateProfileInput = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().min(5).optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid("Invalid user ID"),
    }),
});
//# sourceMappingURL=auth.validation.js.map