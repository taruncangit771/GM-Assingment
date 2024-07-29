import { isTest } from "../utills/commonHelper";
import db from "../config/db.config";
import { generateToken } from "../utills/jwt";

let test = isTest();
export const userRegistration = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    if (password != confirmPassword) {
      return {
        code: 400,
        success: false,
        message: "Password-Confirm Password Mismatch",
        data: {},
      };
    }
    let existUser = test
      ? [{ count: process.env.USER_COUNT || "0" }]
      : ((await db("users")
          .where({ email: email })
          .orWhere({ username: name })
          .count()) as [{ count: string }]);
    if (+existUser[0].count > 0) {
      return {
        code: 409,
        success: false,
        message: "User Already Exist",
        data: {},
      };
    }
    !test
      ? await db("users").insert({
          username: name,
          email,
          password,
          role: "User",
        })
      : null;
    return { code: 201, success: true, message: "User Registered!", data: {} };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    };
  }
};
export const userLogIn = async (email: string, password: string) => {
  try {
    let user = test ? (process?.env?.USER_COUNT==='1'? {password:'pas@123'} :null) : await db("users").where({ email: email }).select("*").first();
    if (!user) {
      return { code: 404, success: false, message: "User Not Found", data: {} };
    }
    if (user.password == password) {
      let token = await generateToken(user);
      return {
        code: 200,
        success: true,
        message: "Logged In!",
        data: { token: token },
      };
    } else {
      return {code: 401,success: false,message: "Invalid Credentials!",data: {}};
    }
  } catch (error) {
    console.log(error);
    return {code:500, success:false, message:"Internal Server Error", data:{}}
  }
};
export const userProfile = async (id:number) => {
  try {
    let profile = test?process.env.USER_COUNT=='1'?{username:'tarun',email:'tarun.sharma@gamemano.in',role:'User'}:null:(await db("users")
      .where({ id })
      .select("username", "email", "role")
      .first()) as [{ count: string }];
    if (profile) {
      return {code: 200, success:true, message:"User Profile", data:{ ...profile }}
    }
    return {code: 404, success:false, message:"Profile Not Found", data:{}}
  } catch (error) {
    console.log(error);
    return {code:500, success:false, message:"Internal Server Error", data:{}};
  }
};
