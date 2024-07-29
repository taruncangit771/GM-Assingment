import { Request,Response,NextFunction } from "express";
import { sendResponse } from "../utills/commonHelper";

class AppError extends Error {
    public statusCode: number;
    public status: string;
  
    constructor(message: string, statusCode: number, status: string = "error") {
      super(message);
      this.statusCode = statusCode;
      this.status = status;
      this.name = "AppError";
  
      // Capture stack trace in V8-based environments
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  // Usage example
  const error = new AppError("Something went wrong", 400, "fail");
  
export const ErrorMiddleware = (error:AppError, req:Request, res:Response, next:NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Error";
    return sendResponse(res,error.statusCode,false,error.message,{})
  };