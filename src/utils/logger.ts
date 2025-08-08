import { createLogger, transports, format } from 'winston';
import path from 'path';
import fs from 'fs';

// Ensure logs directory exists
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(
            (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
        )
    ),
    transports: [
        new transports.Console(),

        new transports.File({ filename: path.join(logDir, 'combined.log') }),

        new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    ],
});

export default logger;
