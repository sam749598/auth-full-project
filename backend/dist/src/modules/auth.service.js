"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.getAllUsers = exports.getProfile = exports.login = exports.register = void 0;
const env_js_1 = require("../config/env.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_js_1 = require("../config/prisma.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_js_1 = require("../utils/AppError.js");
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_js_1.env.JWT_SECRET, {
        expiresIn: env_js_1.env.JWT_EXPIRES_IN,
    });
};
//register
const register = async (input) => {
    const { name, email, password, role } = input;
    const existingUser = await prisma_js_1.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error("User already exists");
    }
    ;
    const hashedPassword = await bcryptjs_1.default.hash(password, 12);
    const user = await prisma_js_1.prisma.user.create({
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
exports.register = register;
// ─── Login ─── //
const login = async (input) => {
    const { email, password } = input;
    const user = await prisma_js_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError_js_1.AppError("Invalid email or password", 401);
    }
    ;
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError_js_1.AppError("Invalid email or password", 401);
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
exports.login = login;
// ─── Get Profile(self/user) ──── //
const getProfile = async (userId) => {
    const user = await prisma_js_1.prisma.user.findUnique({
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
        throw new AppError_js_1.AppError("User not found", 404);
    }
    ;
    return user;
};
exports.getProfile = getProfile;
// ─── Get All Users(admin only) ─────//
const getAllUsers = async () => {
    const users = await prisma_js_1.prisma.user.findMany({
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
exports.getAllUsers = getAllUsers;
// ─── Update Profile(self/user) ────//
const updateProfile = async (userId, input) => {
    const user = await prisma_js_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError_js_1.AppError("User not found", 404);
    }
    ;
    const updatedUser = await prisma_js_1.prisma.user.update({
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
exports.updateProfile = updateProfile;
// ─── Delete Profile(Admin only) ────//
const deleteProfile = async (userId) => {
    const user = await prisma_js_1.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError_js_1.AppError("User not found", 404);
    }
    await prisma_js_1.prisma.user.delete({ where: { id: userId } });
    return { message: "User deleted successfully" };
};
exports.deleteProfile = deleteProfile;
//# sourceMappingURL=auth.service.js.map