import { Request,Response,NextFunction } from "express"
import {  sendResponse } from "../utills/commonHelper";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";

export const isAuthenticated = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const authHeader = req.headers.authorization;
    if(!authHeader){
        return sendResponse(res,403,false,'Unauthorized Request',{})
    }
    const token = authHeader && authHeader.split(' ')[1] as string;
    if(!token){
        return sendResponse(res,403,false,'Unauthorized Request:Token Not Found',{})
    }
    let decode = jwt.verify(token,process.env.JWT_SECRET||'') as {user:IUser,iat:number,exp:number}
    if(decode && decode.user){
        req.user = decode.user;
        next();
    }else{
        return sendResponse(res,403,false,'Unauthorized Request:Wrong Auth Token',{})
    }
    }catch(error){
        return sendResponse(res,400,false,'Issue In Verifying Auth Token',{})
    }
}

export const isAdmin = async(req:Request,res:Response,next:NextFunction)=>{
    if(req.user && (req.user.role == 'Admin') ){
        next();
    }else{
        return sendResponse(res,403,false,'Unauthorized Request:Not Supposed To Access This Resource',{})
    }
}

export const isUser = async(req:Request,res:Response,next:NextFunction)=>{
    if(req.user && req.user.role == 'User'){
        next();
    }else{
        return sendResponse(res,403,false,'Unauthorized Request:Not Supposed To Access This Resource',{})
    }
}