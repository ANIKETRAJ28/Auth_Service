const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({
            data: response,
            message: "Successfully created the new user",
            success: true,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            message: "Something went wrong in user-controller layer",
            success: false,
            err: error
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully signIn",
            error: {}
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            message: "Something went wrong in user-controller layer",
            success: false,
            err: error
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User is authenticated and password is correct",
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            message: "Something went wrong in user-controller layer",
            success: false,
            err: error
        });
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User has admin role",
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
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
    isAdmin
};