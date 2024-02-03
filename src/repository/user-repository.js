const { User, Role } = require("../models/index");
const ValidationError = require("../utils/validation-error");

class UserRepository {
    
    async create(data) {
        try {
            const user = await User.create(data);
            return user
        } catch (error) {
            if(error.name == "SequelizeValidationError") {
                throw new ValidationError(error); 
            }

            console.log("Something went wrong in user-repository");
            throw error;
        }
    }

    async destroy(data) {
        try {
            const user = User.destroy(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in user-repository");
            return error;
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
            return error;
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
            return error;
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
            return error;
        }
    }
}

module.exports = UserRepository;