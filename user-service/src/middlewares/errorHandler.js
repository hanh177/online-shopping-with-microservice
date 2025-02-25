const winston = require("winston");
const { ErrorResponse, InternalServerError } = require("../core/errorResponse");

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log" }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

// Middleware handling errors
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  logger.error({
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
  });

  if (!(err instanceof ErrorResponse)) {
    error = InternalServerError();
  }

  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal server error",
    stack: process.env.NODE_ENV === "dev" ? error.stack : undefined,
  });
};

module.exports = { logger, errorHandler };
