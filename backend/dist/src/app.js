"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_js_1 = require("./modules/index.js");
const error_middleware_js_1 = require("./middleware/error.middleware.js");
const app = (0, express_1.default)();
// ─── Global Middlewares ──────//
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// ─── API Routes ──//
app.use("/api/auth", index_js_1.authRoutes);
// ─── 404 Handler ───//
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});
// ─── Global Error Handler ────//
app.use(error_middleware_js_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map