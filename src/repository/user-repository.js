const { StatusCodes } = require("http-status-codes");
const { User, Role } = require("../models/index");
const ValidationError = require("../utils/validation-error");
const AppError = require("../utils/error-handler");

class UserRepository {
    
    async create(data) {
        try {
            const user = await User.create(data);
            return user
        } catch (error) {
            if(error.name == "SequelizeValidationError") {
                throw new ValidationError(error); 
            }
            if(error.name == "SequelizeUniqueConstraintError") {
                throw new ValidationError(error);
            }
            console.log("Something went wrong in user-repository");
            throw new AppError();
        }
    }

    async destroy(data) {
        try {
            const response = await User.destroy({
                where: {
                    id: data
                }
            });
            if(!response) {
                throw new AppError(
                    "AppError",
                    "Can not delete the user",
                    "User does not exist",
                    StatusCodes.BAD_REQUEST
                );
            }
            return response;
        } catch (error) {
            console.log(error);
            console.log("Something went wrong in user-repository");
            throw error;
        }
    }

    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ["email", "id"]
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in user-repository");
            throw error;
        }
    }

    async getByEmail(userEmail) {
        try {
            // finding the user details via email
            const user = await User.findOne({
                where: {
                    email:userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in user-repository");
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: "ADMIN"
                }
            });
            return await user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong in user-repository");
            throw error;
        }
    }
}

module.exports = UserRepository;