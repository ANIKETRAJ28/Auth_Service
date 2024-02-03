const AppError = require("./error-handler");
const { StatusCodes } = require("http-status-codes");
class ValidationError extends AppError {
    constructor(error) {
        let explaination = [], errorName = error.name;
            error.errors.forEach(err => {
                explaination.push(err.message);
            });
        super(
            errorName,
            "Not able to validate data sent in the input request",
            explaination,
            StatusCodes.BAD_REQUEST
        )
    }
}

module.exports = ValidationError;