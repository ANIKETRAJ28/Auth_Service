const { StatusCodes } = require("http-status-codes");

class AppError extends Error {
    constructor(
        name = "AppError",
        message = "Something went wrong",
        explaination = "Something went wrong",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.name = name;
        this.message = message;
        this.explaination = explaination;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;