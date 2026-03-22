"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const app_js_1 = __importDefault(require("./app.js"));
const startServer = async () => {
    try {
        app_js_1.default.listen(process_1.env.PORT, () => {
            console.log(`server successfully running on port:${process_1.env.PORT}`);
            //  console.log(`Environment: ${env.NODE_ENV}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map