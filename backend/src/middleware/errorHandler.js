const ErrorResponse = require("../utils/errorResponse");
const chalk = require("chalk");

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //log to console for development
  console.log(chalk.bold.redBright(err));
  console.log(err);

  //Mongoose Bad Object Id (Cast Error)
  if (err.name === "CastError" && err.kind === " ObjectId") {
    const message = `No resource found for the requested id ${err.value}`;
    error = new ErrorResponse(message, 404);
  } //Mongoose Bad Value
  else if (err.name === "CastError") {
    const message =
      "We look at everywhere But not found any matching resources";
    error = new ErrorResponse(message, 404);
  }

  //Mongoose Duplication Error (User duplication)
  if (err.name === "MongoServerError" && err.code === 11000) {
    const duplicationKey = Object.keys(err.keyPattern)[0];
    const duplicationValue = err.keyValue[duplicationKey];
    const message = `This "${duplicationValue}" ${duplicationKey} already exits. Please enter different ${duplicationKey} `;
    //err.keyPattern.email

    error = new ErrorResponse(message, 400);
  } //Other Mongo Error
  else if (err.name === "MongoServerError") {
    const message = `Your request has some bad parameters. ${err.message}`;
    error = new ErrorResponse(message, 400);
  }

  //Mongo Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((it) => {
      return `${it.message}`;
    });
    error = new ErrorResponse(message, 400);
  }

  //Type Error
  if (err.name === "TypeError") {
    const message = `An unknown error occurred while processing your request. Please try again later.`;
    error = new ErrorResponse(message, 500);
  }

  // JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Session Expired. Please Login Again`;
    error = new ErrorResponse(message, 401);
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    error: error.message.trim() || "Server Error",
  });
};
