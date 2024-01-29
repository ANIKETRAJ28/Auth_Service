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

module.exports = {
    create,
    signIn
};