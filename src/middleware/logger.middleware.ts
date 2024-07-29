import { Request, Response, NextFunction } from "express";
import logger from "../logger";
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
   // Store the original res.send method
   const originalSend = res.send;

   // Variable to capture the response body
   let responseBody: any;
 
   // Override the res.send method to capture the response body
   res.send = function (body: any) {
     responseBody = body;
     // Call the original res.send method with correct type assertion
     return originalSend.apply(this, [body]);
   };
 
  // Capture response information after request processing completes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode, statusMessage } = res;
    logger.info(`${new Date().toISOString()}::RequestInfo::Method: ${
      req.method
    }_Endpoint: ${
      req.url
    } |ResponseInfo::Status: ${statusCode}_ResponseTime: ${duration}ms_ResponseBody: ${
      typeof responseBody === "object"
        ? JSON.stringify(responseBody)
        : responseBody
    }`);
  });

  // Pass control to the next middleware function
  next();
};
