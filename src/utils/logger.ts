// src/utils/logger.ts
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
        // 🔄 Log everything to console
        new transports.Console(),

        // 📝 Info & above (info, warn, error) go to combined.log
        new transports.File({ filename: path.join(logDir, 'combined.log') }),

        // ❌ Only errors go to error.log
        new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    ],
});

export default logger;
