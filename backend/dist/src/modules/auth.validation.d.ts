import { z } from "zod";
export declare const registrationSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
            USER: "USER";
            ADMIN: "ADMIN";
        }>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateProfileInput: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        password: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registrationSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
export type updateProfileInput = z.infer<typeof updateProfileInput>["body"];
//# sourceMappingURL=auth.validation.d.ts.map