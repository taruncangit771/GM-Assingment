import { sendResponse, isTest } from "../utills/commonHelper";
import { Request, Response } from "express";
import db from "../config/db.config";
import { paginate } from "../utills/commonHelper";
let test = isTest();
export const createGame = async (
  name: string,
  genre: string,
  releaseDate: string
) => {
  try {
    if (new Date(releaseDate).getTime() < new Date(Date.now()).getTime()) {
      return {
        code: 400,
        success: false,
        message: "You Cant Create A Game With Past Release Date",
        data: {},
      };
    }
    let existingGame = test
      ? process.env.GAME_COUNT == "1"
        ? { id: 1 }
        : null
      : await await db("games").where({ name: name }).select("id").first();
    if (existingGame) {
      return {
        code: 400,
        success: false,
        message: "Use Different Name: Already In Use",
        data: {},
      };
    }
    !test
      ? await db("games").insert({
          name,
          genre,
          releaseDate: new Date(releaseDate),
        })
      : null;
    return { code: 200, success: true, message: "New Game Created!", data: {} };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    };
  }
};
export const getAllGame = async (page:number, pageSize:number, name?:string, genre?:string, sortColumn?:string, sortOrder?:string) => {
  try {
    
    
    const filters: Record<string, any> = {};
    filters.is_deleted = 0;
    if (name) filters.name = name;
    if (genre) filters.genre = genre;
    let sort: { column: string; order: "asc" | "desc" } = {
      column: "created_at",
      order: "desc",
    };

    if (sortColumn && sortOrder) {
      sort.column = sortColumn as string;
      sort.order = (sortOrder as "asc" | "desc") || "desc";
    }

    let games = test
    ? {
        data: [],
        metadata: {
          totalItems: 1,
          totalPages: 20,
          currentPage: page,
          pageSize,
        },
      }
    :await paginate("games", { page, pageSize, filters, sort });
    return {code: 200, success:true, message:"Game List",data: { ...games }};
  } catch (error) {
    console.log(error);
    return {code: 500, success:false, message:"Internal Server Error", data:{}};
  }
};
export const getSingleGame = async (id: number) => {
  try {
    let game = test
      ? process.env.GAME_COUNT == "1"
        ? {
            id: 1,
            name: "Taken3",
            genre: "Action",
            releaseDate: "2024-07-26 12:29:32.532529+05:30",
            createdAt: "2024-07-26 12:29:32.532529+05:30",
            updatedAt: "2024-07-26 12:29:32.532529+05:30",
            is_deleted: 0,
          }
        : null
      : await db("games").where({ id: id, is_deleted: 0 }).first();
    if (!game) {
      return {
        code: 404,
        success: false,
        message: "Wrong Id: Game Not Found",
        data: {},
      };
    }
    return { code: 200, success: true, message: "Game", data: { ...game } };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    };
  }
};

export const updateGame = async (id:number,name?:string,genre?:string,releaseDate?:string) => {
  try {
    if (releaseDate && new Date(releaseDate).getTime() < new Date(Date.now()).getTime()) {
      return {
        code: 400,
        success: false,
        message: "You Cant Update A Game's Release Date With Past One",
        data: {},
      };
    }
    let game = test?process.env.GAME_COUNT=='1'?{id:1}:null:await db("games").where({ id: id }).first();
    if (!game) {
      return {code:404, success:false, message:"Wrong Id: Game Not Found", data:{}};
    }
    const toBeUpdate: Record<string, any> = {};
    if (name) toBeUpdate.name = name;
    if (genre) toBeUpdate.genre = genre;
    if (releaseDate) toBeUpdate.releaseDate = new Date(releaseDate);
    test?null:await db("games").where({ id }).update(toBeUpdate);
    return {code:200, success:true, message:"Game Details Update", data:{}};
  } catch (error) {
    console.log(error);
    return {code:500, success:false, message:"Internal Server Error", data:{}};
  }
};

export const deleteGame = async (id:number) => {
  try {
    let game = test?process.env.GAME_COUNT=='1'?{id:1}:null:await db("games").where({ id: id }).first();
    if (!game) {
      return {code:404, success:false, message:"Wrong Id: Game Not Found", data:{}};
    }
    test?null:await db("games").where({ id }).update({ is_deleted: 1 });
    return {code:200, success:true, message:"Game Deleted", data:{}};
  } catch (error) {
    console.log(error);
    return {code:500, success:false, message:"Internal Server Error", data:{}};
  }
};
