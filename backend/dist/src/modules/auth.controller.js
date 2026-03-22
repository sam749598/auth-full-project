"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.getAllUsers = exports.getMe = exports.login = exports.register = void 0;
const authService = __importStar(require("./auth.service.js"));
const response_js_1 = require("../utils/response.js");
const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body);
        return (0, response_js_1.sendsuccess)(res, "User registered successfully", result, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
// ─── Login ──────
const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        return (0, response_js_1.sendsuccess)(res, "Login successful", result);
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
// ─── Get Profile ────
const getMe = async (req, res, next) => {
    try {
        const user = await authService.getProfile(req.user.userId);
        return (0, response_js_1.sendsuccess)(res, "Profile fetched", user);
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
// ─── Get All Users(admon only) ─────//
const getAllUsers = async (req, res, next) => {
    try {
        const users = await authService.getAllUsers();
        return (0, response_js_1.sendsuccess)(res, "Users fetched successfully", users);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllUsers = getAllUsers;
// ─── Update Profile(user and admin) ──────//
const updateProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return (0, response_js_1.sendError)(res, "User ID is required", 400, "BAD_REQUEST");
        }
        if (req.user.role !== "ADMIN" && req.user.userId !== id) {
            return (0, response_js_1.sendError)(res, "Access denied", 403, "FORBIDDEN");
        }
        const result = await authService.updateProfile(id, req.body);
        return (0, response_js_1.sendsuccess)(res, "Profile updated successfully", result);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
// ─── Delete Profile(admin only)─────//
const deleteProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user.role !== "ADMIN") {
            return (0, response_js_1.sendError)(res, "Access denied. Admins only.", 403, "FORBIDDEN");
        }
        const result = await authService.deleteProfile(id);
        return (0, response_js_1.sendsuccess)(res, "User deleted successfully", result);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProfile = deleteProfile;
//# sourceMappingURL=auth.controller.js.map