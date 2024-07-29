import { sendResponse } from "../utills/commonHelper";
import { Request, Response, NextFunction } from "express";
import {
  createGame,
  getSingleGame,
  getAllGame,
  updateGame,
  deleteGame,
} from "../services/game.service";
import { IResponse } from "../interfaces/response.interface";
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, genre, releaseDate } = req.body;
    let response = (await createGame(name, genre, releaseDate)) as IResponse;
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

export const getGames = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { pageNo, perPage, name, genre, sortColumn="created_at", sortOrder="desc" } = req.query as {
      pageNo?: string;
      perPage?: string;
      name? :string;
      genre? : string;
      sortColumn?: string;
      sortOrder?: string;
    };
    let page = pageNo ? +pageNo : 1;
    let pageSize = perPage ? +perPage : 10;
    let response = await getAllGame(page,pageSize,name,genre,sortColumn,sortOrder);
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

export const getGame = async (req: Request, res: Response) => {
  try {
    let id = +req?.params?.id || 0;
    let response = await getSingleGame(id);
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

export const update = async (req: Request, res: Response) => {
  try {
    let id = +req?.params?.id || 0;
    let { name, genre, releaseDate } = req.query as {
      name: string;
      genre: string;
      releaseDate: string;
    };
    let response = await updateGame(id, name, genre, releaseDate);
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

export const del = async (req: Request, res: Response) => {
  try {
    let id = +req?.params?.id || 0;
    let response = await deleteGame(id);
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
