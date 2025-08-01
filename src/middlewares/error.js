const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const httpStatus = require('http-status');
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = Object.values(err.errors).map(error => error.message).join('. ');
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    statusCode = httpStatus.BAD_REQUEST;
    message = `Duplicate field value: ${Object.keys(err.keyValue)}. Please use another value.`;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = httpStatus.UNAUTHORIZED;
    message = 'Invalid token. Please log in again.';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = httpStatus.UNAUTHORIZED;
    message = 'Token has expired. Please log in again.';
  }

  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack, 
    statusCode, 
    details: err.details || {}
  });

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err
    }),
  });
};

module.exports = { errorHandler };
