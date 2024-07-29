import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { loggerMiddleware } from './middleware/logger.middleware';
import logger from './logger';
import { ErrorMiddleware } from './middleware/error.middleware';
dotenv.config(); 
const app = express();
const port = process.env.PORT || '3000';

app.use(express.json());
app.use(ErrorMiddleware)
app.use(loggerMiddleware)
//Health Check
app.get('/', async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Server is Up!!",
    data: {}
  });
});

import mainRoute from './routes/main.routes';
app.use("/api", mainRoute);

// Start the server
let server = app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  console.log(`Server is running on http://localhost:${port}`)
});

export default server
