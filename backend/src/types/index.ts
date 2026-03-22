import { Request } from 'express';


export interface AuthPayload{
    userId: string;
    email: string;
    role: string;
};


export interface AuthRequest extends Request {
    user?:AuthPayload
};

export interface ApiResponse<T = unknown>{
    success: boolean,
    message: string,
    data?: T;
    error?:string
}