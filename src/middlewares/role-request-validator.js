const AdminRole = (req, res, next) => {
    if(!req.body.id) return res.status(500).json({
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