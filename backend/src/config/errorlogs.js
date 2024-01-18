const { errorLog, customLog } = require('../model/logs');
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file');

const transport = new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m', // Maximum log file size
    maxFiles: '14d', // Maximum retention time for log files
  });

const logger = winston.createLogger({
    level: 'info',
   // 
   transports: [transport],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.metadata(),
        // winston.format.prettyPrint()
    ),
    statusLevels: true
})
const customlogger = async (msg, meta = {}) => {
    logger.info(msg);
    const logEntry = new customLog({
        level: 'info',
        message: msg,
        meta,
    });
    await logEntry.save();
}

const errorLoggerMiddleware = async (err, req, res, next) => {
    logger.error(`Error: ${err.message}`, err);
    // console.log(err.keyPattern.email)
    // Save the error to MongoDB
    const logEntry = new errorLog({
        level: 'error',
        message: err.message,
        meta: { stack: err.stack, additionalInfo: 'additional_info' },
    });
    // console.log(logEntry)
    await logEntry.save();
    // res.status(400).json({message:err.message})
    next(err);
};


module.exports = { errorLoggerMiddleware, customlogger };






 // transports: [
    //     // new transports.Console(),
    //     new winston.transports.MongoDB({
    //         db: 'mongodb://0.0.0.0:27017/task-manager',
    //         options: {
    //             useNewUrlParser: true,
    //             useUnifiedTopology: true,
    //         },
    //         collection: 'logs',
    //     })
    // ],