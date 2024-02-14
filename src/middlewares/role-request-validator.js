const { StatusCodes } = require("http-status-codes");

const AdminRole = (req, res, next) => {
    if(!req.body.id) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        data: {},
        success: false,
        message: "Something went wrong",
        err: "Id missing in the request"
    });
    next();
}

module.exports = {
    AdminRole
}