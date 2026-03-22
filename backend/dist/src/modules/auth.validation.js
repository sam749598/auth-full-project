import { z } from "zod";
export const registrationSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters").optional(),
        email: z.string().email("Invalid email address"),
        password: z.string().min(5, "Password must be at least 5 characters"),
        role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
    })
});
export const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(5, "Password must be at least 5 characters"),
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
export const updateProfileInput = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        email: z.string().email().optional(),
        password: z.string().min(5).optional(),
    }),
    params: z.object({
        id: z.string().uuid("Invalid user ID"),
    }),
});
//# sourceMappingURL=auth.validation.js.map