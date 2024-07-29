import fs from 'fs';
import path from 'path';
import winston from 'winston';
import { format } from 'logform';

// Define log directory
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Get the current date in YYYY-MM-DD format
const currentDate = new Date().toISOString().split('T')[0];

// Create a winston logger instance
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [
    // Combined log file
    new winston.transports.File({
      filename: path.join(logsDir, `combined-${currentDate}.log`),
      level: 'info',
    }),
    // Info log file
    new winston.transports.File({
      filename: path.join(logsDir, `info-${currentDate}.log`),
      level: 'info',
      handleExceptions: true,
    }),
    // Error log file
    new winston.transports.File({
      filename: path.join(logsDir, `error-${currentDate}.log`),
      level: 'error',
      handleExceptions: true,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, `exceptions-${currentDate}.log`),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, `rejections-${currentDate}.log`),
    }),
  ],
});

export default logger;
