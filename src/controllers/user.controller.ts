import { sendResponse } from "../utills/commonHelper"
import { Request,Response,NextFunction } from "express"
import { userRegistration,userLogIn, userProfile } from "../services/user.service";
import { IResponse } from "../interfaces/response.interface";
export const register = async(req:Request,res:Response)=>{
    try{
        let {name,email,password,confirmPassword} = req.body;
        let response = await userRegistration(name,email,password,confirmPassword) as IResponse
        return sendResponse(res,response.code,response.success,response.message,response.data)
    }catch(error){
        console.error(error)
        return sendResponse(res,500,false,'Internal Server Error',{})
    }
}

export const logIn = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let {email,password} = req.body;
        let response = await userLogIn(email,password) as IResponse
        return sendResponse(res,response.code,response.success,response.message,response.data)
    }catch(error){
        console.error(error)
        return sendResponse(res,500,false,'Internal Server Error',{})
    }
}

export const getProfile = async(req:Request,res:Response)=>{
    try{
        let id = req?.user?.id || 0;
        let response = await userProfile(id) as IResponse
        return sendResponse(res,response.code,response.success,response.message,response.data)
    }catch(error){
        console.error(error)
        return sendResponse(res,500,false,'Internal Server Error',{})
    }
}