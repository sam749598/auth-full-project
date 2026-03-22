import { Response } from "express";
export declare const sendsuccess: <T>(res: Response, message: string, data?: T, statusCode?: number) => Response;
export declare const sendError: <T>(res: Response, message: string, statusCode?: number, error?: string) => Response;
//# sourceMappingURL=response.d.ts.map