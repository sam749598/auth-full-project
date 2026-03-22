import { Response } from "express"
import { ApiResponse } from "../types/index.js"


export const sendsuccess=<T>(
    res:Response,
    message:string,
    data?:T,
    statusCode=200
):Response=>{
    const response:ApiResponse<T>={
        success:true,
        message,
        data,
        
    };

    return res.status(statusCode).json(response)
    
};


export const sendError=<T>(
    res:Response,
    message:string,
    statusCode=400,
    error?:string
):Response=>{
    const response:ApiResponse<T>={
        success:false,
        message,
        error,
        
    };

    return res.status(statusCode).json(response)
}