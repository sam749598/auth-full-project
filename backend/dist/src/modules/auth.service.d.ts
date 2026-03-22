import { LoginInput, RegisterInput, updateProfileInput } from "./auth.validation.js";
export declare const register: (input: RegisterInput) => Promise<{
    user: {
        name: string | null;
        email: string;
        role: import("src/generated/prisma/enums.js").Role;
        id: string;
        createdAt: Date;
    };
    token: string;
}>;
export declare const login: (input: LoginInput) => Promise<{
    user: {
        name: string | null;
        email: string;
        role: import("src/generated/prisma/enums.js").Role;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    };
    token: string;
}>;
export declare const getProfile: (userId: string) => Promise<{
    name: string | null;
    email: string;
    role: import("src/generated/prisma/enums.js").Role;
    id: string;
    createdAt: Date;
}>;
export declare const getAllUsers: () => Promise<{
    name: string | null;
    email: string;
    role: import("src/generated/prisma/enums.js").Role;
    id: string;
    createdAt: Date;
}[]>;
export declare const updateProfile: (userId: string, input: updateProfileInput) => Promise<{
    name: string | null;
    email: string;
    role: import("src/generated/prisma/enums.js").Role;
    id: string;
    createdAt: Date;
}>;
export declare const deleteProfile: (userId: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map