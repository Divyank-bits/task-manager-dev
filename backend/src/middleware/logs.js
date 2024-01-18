const winston = require('winston');
require('winston-mongodb') 
const expressWinston = require('express-winston') 

const logger = expressWinston.logger({
// const logger = winston.createLogger({
    transports: [
        // new transports.Console(),
        new winston.transports.MongoDB({
            db: 'mongodb://0.0.0.0:27017/task-manager',
            collection: 'logs',
        })
    ],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.metadata(),
        winston.format.prettyPrint()
    ),
    statusLevels: true
})
module.exports= logger