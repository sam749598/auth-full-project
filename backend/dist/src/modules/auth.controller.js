import * as authService from "./auth.service.js";
import { sendError, sendsuccess } from "../utils/response.js";
export const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body);
        return sendsuccess(res, "User registered successfully", result, 201);
    }
    catch (error) {
        next(error);
    }
};
// ─── Login ──────
export const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        return sendsuccess(res, "Login successful", result);
    }
    catch (error) {
        next(error);
    }
};
// ─── Get Profile ────
export const getMe = async (req, res, next) => {
    try {
        const user = await authService.getProfile(req.user.userId);
        return sendsuccess(res, "Profile fetched", user);
    }
    catch (error) {
        next(error);
    }
};
// ─── Get All Users(admon only) ─────//
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await authService.getAllUsers();
        return sendsuccess(res, "Users fetched successfully", users);
    }
    catch (error) {
        next(error);
    }
};
// ─── Update Profile(user and admin) ──────//
export const updateProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return sendError(res, "User ID is required", 400, "BAD_REQUEST");
        }
        if (req.user.role !== "ADMIN" && req.user.userId !== id) {
            return sendError(res, "Access denied", 403, "FORBIDDEN");
        }
        const result = await authService.updateProfile(id, req.body);
        return sendsuccess(res, "Profile updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
// ─── Delete Profile(admin only)─────//
export const deleteProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user.role !== "ADMIN") {
            return sendError(res, "Access denied. Admins only.", 403, "FORBIDDEN");
        }
        const result = await authService.deleteProfile(id);
        return sendsuccess(res, "User deleted successfully", result);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map