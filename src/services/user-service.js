const UserRepository = require("../repository/user-repository");

const userRepository = new UserRepository();

class UserService {

    async create(data) {
        try {
            const response = await userRepository.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in user-service layer");
            return error;
        }
    }
}

module.exports = UserService;