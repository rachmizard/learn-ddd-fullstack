import * as winstonLogger from 'winston'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'white',
  silly: 'gray',
}

winstonLogger.addColors(colors)

const format = winstonLogger.format.combine(
  // Add the message timestamp with the preferred format
  winstonLogger.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Tell Winston that the logs must be colored
  winstonLogger.format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  winstonLogger.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
)

const transports = [
  // Allow the use the console to print the messages
  new winstonLogger.transports.Console(),
  // Allow to print all the error level messages inside the error.log file
  new winstonLogger.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  new winstonLogger.transports.File({ filename: 'logs/all.log' }),
]

const winston = winstonLogger.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default winston
