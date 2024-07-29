import fs from 'fs';
import path from 'path';
import winston from 'winston';
import { format } from 'logform';

const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const currentDate = new Date().toISOString().split('T')[0];

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, `combined-${currentDate}.log`),
      level: 'info',
    }),

    new winston.transports.File({
      filename: path.join(logsDir, `info-${currentDate}.log`),
      level: 'info',
      handleExceptions: true,
    }),

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
