const { StatusCodes } = require("http-status-codes");

const validateUser = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: "Email or password missing on the request"
        });
    }
    next();
}

module.exports = {
    validateUser
}