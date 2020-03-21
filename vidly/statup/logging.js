const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;
require('express-async-errors');
require('winston-mongodb');

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

const logger = winston.createLogger({
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.Console({ colorize: true, prettyPrint:true }),
        new winston.transports.File({ filename: 'logfile.log' }),
        new winston.transports.MongoDB({ 
            db: 'mongodb://localhost:27018/vidly',
            options: {useNewUrlParser: true, useUnifiedTopology: true}
        })
    ],
    exceptionHandlers: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'exceptionHandlers.log' })
    ]
});

module.exports = {
    logger,
    logging: function () {
        process.on('unhandledRejection', (ex) => {
            throw ex;
        });
        
        process.on('uncaughtException', (ex) => {
            logger.error(ex.message, ex);
        });
    }
}