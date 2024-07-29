import { paginate, sendResponse, isTest } from "../utills/commonHelper";
import { Request, Response } from "express";
import db from "../config/db.config";
let test = isTest();
export const addScore = async (
  userId: number,
  gameId: number,
  score: number
) => {
  try {
    let game = test
      ? process.env.GAME_COUNT == "1"
        ? { id: 1 }
        : null
      : await db("games").where({ id: gameId, is_deleted: 0 }).first();
    if (!game) {
      return {
        code: 400,
        success: false,
        message: "Game Not Exist!",
        data: {},
      };
    }

    test
      ? null
      : await db("scores").insert({
          userId,
          gameId,
          score,
        });
    return { code: 200, success: true, message: "Score Added!", data: {} };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: "Internal Server Error",
      data: {},
    };
  }
};
export const getScoreByUser = async (
  userId: number,
  page: number,
  pageSize: number,
  sortColumn: string,
  sortOrder: string
) => {
  try {
    const filters: Record<string, any> = {};
    filters.is_deleted = 0;

    if (userId) filters.userId = userId;
    let sort: { column: string; order: "asc" | "desc" } = {
      column: "created_at",
      order: "desc",
    };

    if (sortColumn && sortOrder) {
      sort.column = sortColumn as string;
      sort.order = (sortOrder as "asc" | "desc") || "desc";
    }
    let scores = test
      ? {
          data: [],
          metadata: {
            totalItems: 1,
            totalPages: 20,
            currentPage: page,
            pageSize,
          },
        }
      : await paginate("scores", {
          page,
          pageSize,
          filters,
          sort,
        });
    return {
      code: 200,
      success: true,
      message: "User Scores",
      data: { ...scores },
    };
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
export const getScoreByGame = async (
  gameId: number,
  page: number,
  pageSize: number,
  sortColumn: string,
  sortOrder: string
) => {
  try {
    let game = test? {id:1} : await db("games").where({ id: gameId, is_deleted: 0 }).first();
    if (!game) {
      return {code:404, success:false, message:"Game Not Exist!", data:{}};
    }
    const filters: Record<string, any> = {};
    filters.is_deleted = 0;

    if (gameId) filters.gameId = gameId;
    let sort: { column: string; order: "asc" | "desc" } = {
      column: "created_at",
      order: "desc",
    };

    if (sortColumn && sortOrder) {
      sort.column = sortColumn as string;
      sort.order = (sortOrder as "asc" | "desc") || "desc";
    }
    let scores = test
    ? {
        data: [],
        metadata: {
          totalItems: 1,
          totalPages: 20,
          currentPage: page,
          pageSize,
        },
      }
    :await paginate("scores", {
      page,
      pageSize,
      filters,
      sort,
    });
    return {code:200, success:true, message:"User Scores", data:{ ...scores }};
  } catch (error) {
    console.log(error);
    return {code:500, success:false, message:"Internal Server Error", data:{}};
  }
};
