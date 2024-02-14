const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(StatusCodes.CREATED).json({
            data: {
                id: response.dataValues.id,
                email: response.dataValues.email
            },
            message: "Successfully created the new user",
            success: true,
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explaination
        });
    }
}

const destroy = async (req, res) => {
    try {
        const response = await userService.destroy(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: response,
            message: "Successfully deleted the user",
            success: true,
            err: {}
        });
    } catch (error) {
        if(error.name) {
            return res.status(error.statusCode).json({
                data: {},
                success: false,
                message: error.message,
                explaination: error.explaination
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            err: error
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: "Successfully signIn",
            error: {}
        })
    } catch (error) {
        if(error.name == "AppError") {
            return res.status(error.statusCode).json({
                data: {},
                success: false,
                message: error.message,
                explaination: error.explaination,
            });
        }
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            explaination: error.explaination,
            err: error,
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: "User is authenticated and password is correct",
            error: {}
        });
    } catch (error) {
        console.log(error);
        if(error.name == "AppError") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                data: {},
                success: false,
                message: "invalid token",
                explaination: "Please sign in again"
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "invalid token",
            err: error
        });
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(StatusCodes.CREATED).json({
            data: response,
            success: true,
            message: "User has admin role",
            error: {}
        });
    } catch (error) {
        if(error.name == "TypeError") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                data: {},
                success: false,
                message: "User not found",
                explaination: "User do not have an admin role"
            });    
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            message: "Something went wrong in user-controller layer",
            success: false,
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin,
    destroy
};