import { sendResponse } from "../utills/commonHelper";
import { Request, Response, NextFunction } from "express";
import {
  addScore,
  getScoreByUser,
  getScoreByGame,
} from "../services/score.service";
import { IResponse } from "../interfaces/response.interface";
export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { gameId, score } = req.body;
    let userId = req?.user?.id as number;
    let response = (await addScore(userId, gameId, score)) as IResponse;
    return sendResponse(
      res,
      response.code,
      response.success,
      response.message,
      response.data
    );
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, false, "Internal Server Error", {});
  }
};

export const getByUser = async (req: Request, res: Response) => {
  try {
    let userId = +req?.params?.id || 0;
    let {
      pageNo,
      perPage,
      sortColumn = "created_at",
      sortOrder = "desc",
    } = req.query as {
      pageNo?: string;
      perPage?: string;
      sortColumn?: string;
      sortOrder?: string;
    };
    let page = pageNo ? +pageNo : 1;
    let pageSize = perPage ? +perPage : 10;
    let response = (await getScoreByUser(
      userId,
      page,
      pageSize,
      sortColumn,
      sortOrder
    )) as IResponse;
    return sendResponse(
      res,
      response.code,
      response.success,
      response.message,
      response.data
    );
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, false, "Internal Server Error", {});
  }
};

export const getByGame = async (req: Request, res: Response) => {
  try {
    let gameId = +req?.params?.id || 0;
    let {
      pageNo,
      perPage,
      sortColumn = "created_at",
      sortOrder = "desc",
    } = req.query as {
      pageNo?: string;
      perPage?: string;
      sortColumn?: string;
      sortOrder?: string;
    };
    let page = pageNo ? +pageNo : 1;
    let pageSize = perPage ? +perPage : 10;
    let response = await getScoreByGame(gameId, page, pageSize, sortColumn, sortOrder);
    return sendResponse(
      res,
      response.code,
      response.success,
      response.message,
      response.data
    );
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, false, "Internal Server Error", {});
  }
};
