const winston = require('winston');

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.colorize() ,
        winston.format.splat(),
        winston.format.printf(({ level, message, stack }) => `${level}: ${message} : ${stack}`),

    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ["error"],
        }),
    ],
})

module.exports = logger;