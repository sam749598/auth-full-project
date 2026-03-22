import { NextFunction, Response } from "express";
import { AuthPayload, AuthRequest } from "../types/index.js";
import { sendError } from "../utils/response.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";


export const authenticate = (
    req:AuthRequest,
    res:Response,
    next:NextFunction
)=>{
    
    const authHeader = (req.headers as any).authorization;
    

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return sendError(res, "Unauthorized", 401, "UNAUTHORIZED");
    };

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
        req.user = decoded;
        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return sendError(res, "Token has expired", 401, "TOKEN_EXPIRED");
        }
        return sendError(res, "Invalid token", 401, "INVALID_TOKEN")
    }

}


export const authorizeRoles = (
    ...roles: string[]
) => (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return sendError(res, "Access denied", 403, "FORBIDDEN");
    }
    next();
}