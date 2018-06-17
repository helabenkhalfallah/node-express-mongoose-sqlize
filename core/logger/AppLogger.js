import * as winston from 'winston'
import * as fs from 'fs'
import path from 'path'

//create log file if not exist
let logDirectory = path.join(__dirname, process.env.LOG_DIR_NAME)
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

//app loger config
let AppLogger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: process.env.LOG_FILE_NAME,
      dirname: logDirectory,
      handleExceptions: true,
      json: true,
      maxsize: process.env.LOG_MAX_SIZE,
      maxFiles: process.env.LOG_MAX_FILE,
      colorize: false
    }),
    new winston.transports.Console({
      name: 'error',
      level: 'error',
      handleExceptions: true,
      json: false,
      colorize: true
    }),
    new winston.transports.Console({
      name: 'debug',
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
})

export default AppLogger