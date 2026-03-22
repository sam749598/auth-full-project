import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/AppError.js";
const generateToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
    });
};
//register
export const register = async (input) => {
    const { name, email, password, role } = input;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("User already exists");
    }
    ;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, role: role || "USER" },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        }
    });
    const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
    });
    return { user, token };
};
// ─── Login ─── //
export const login = async (input) => {
    const { email, password } = input;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    ;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }
    ;
    const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role
    });
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};
// ─── Get Profile(self/user) ──── //
export const getProfile = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        }
    });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    ;
    return user;
};
// ─── Get All Users(admin only) ─────//
export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
    });
    return users;
};
// ─── Update Profile(self/user) ────//
export const updateProfile = async (userId, input) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    ;
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { ...input },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        }
    });
    return updatedUser;
};
// ─── Delete Profile(Admin only) ────//
export const deleteProfile = async (userId) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError("User not found", 404);
    }
    await prisma.user.delete({ where: { id: userId } });
    return { message: "User deleted successfully" };
};
//# sourceMappingURL=auth.service.js.map