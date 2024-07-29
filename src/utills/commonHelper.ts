import { Request, Response, NextFunction } from "express";
import db from "../config/db.config";
export const isTest =()=>{
  return process?.env?.NODE_ENV=='test'
}
export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: {}
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export interface ValidationSchema {
  [key: string]: {
    required?: boolean;
    type?: "string" | "number" | "boolean" | "object" | "array" | "date";
  };
}

export const validator = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];
    const body = req.body as Record<string, any>; 

    for (const [key, rules] of Object.entries(schema)) {
      if (rules.required && (body[key] === undefined || body[key] === null)) {
        errors.push(`Field ${key} is required`);
      } else if (body[key] !== undefined && body[key] !== null) {
        switch (rules.type) {
          case "string":
            if (typeof body[key] !== "string") {
              errors.push(`Field ${key} should be of type string`);
            }
            break;
          case "number":
            if (typeof body[key] !== "number") {
              errors.push(`Field ${key} should be of type number`);
            }
            break;
          case "boolean":
            if (typeof body[key] !== "boolean") {
              errors.push(`Field ${key} should be of type boolean`);
            }
            break;
          case "object":
            if (typeof body[key] !== "object" || Array.isArray(body[key])) {
              errors.push(`Field ${key} should be of type object`);
            }
            break;
          case "array":
            if (!Array.isArray(body[key])) {
              errors.push(`Field ${key} should be of type array`);
            }
            break;
          case "date":
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!datePattern.test(body[key])) {
              errors.push(`Invalid date format. Use YYYY-MM-DD for ${key}`);
            }
            break;
        }
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation Errors",
        errors,
      });
    }

    next();
  };
};

interface SortOptions {
  column: string;
  order: 'asc' | 'desc';
}

interface PaginationOptions {
  page?: number;
  pageSize?: number;
  filters?: Record<string, any>;
  sort?: SortOptions;
}

export const paginate = async (tableName: string, { page = 1, pageSize = 10, filters = {}, sort = { column: 'createdAt', order: 'desc' } }: PaginationOptions = {}) => {
  try {
    const offset = (page - 1) * pageSize;
    let query = db(tableName).where(filters);
    if (sort.column) {
      query = query.orderBy(sort.column, sort.order);
    }
    const data = await query.clone().offset(offset).limit(pageSize);

    const countQuery = db(tableName).where(filters).count('* as count');
    const [{ count }] = await countQuery;
    const totalItems = parseInt(count as unknown as string, 10);
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data,
      metadata: {
        totalItems,
        totalPages,
        currentPage: page,
        pageSize,
      },
    };
  } catch (error) {
    console.error('Error fetching paginated data:', error);
    return {code:500,success:false,message:'Error In Fetcing Paginated Data',data:{}}
  }
};