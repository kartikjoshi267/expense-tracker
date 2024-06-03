import winston from 'winston';

const dateFormat = () => {
  return new Date(Date.now()).toUTCString()
}

class LoggerService {
  log_data: winston.LogEntry | null;
  logger: winston.Logger;

  constructor() {
    this.log_data = null
    const logger = winston.createLogger({
      
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/app.log`
        })
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(info => {
          if (info.obj) {
            return `${info.timestamp} ${info.level}: ${info.message} ${JSON.stringify(info.obj, null, 2)}`;
          }
          return `${info.timestamp} ${info.level}: ${info.message}`;
        })
      )
    });
    this.logger = logger
  }

  setLogData(log_data) {
    this.log_data = log_data
  }

  async info(message, obj ?: any) {
    this.logger.log('info', message, {
      obj
    });
  }

  async debug(message, obj ?: any) {
    this.logger.log('debug', message, {
      obj
    });
  }

  async error(message, obj ?: any) {
    this.logger.log('error', message, {
      obj
    });
  }
}

const logger = new LoggerService();
export default logger;