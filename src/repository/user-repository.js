const { User } = require("../models/index");

class UserRepository {
    
    async create(data) {
        try {
            const user = await User.create(data);
            return user
        } catch (error) {
            console.log("Something went wrong in user-repository");
            return error;
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
}

module.exports = UserRepository;