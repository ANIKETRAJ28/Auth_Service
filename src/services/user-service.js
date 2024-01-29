const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");

const userRepository = new UserRepository();
const jwt = require("jsonwebtoken");

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

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: 60 });
            return result;
        } catch (error) {
            console.log("Something went wrong while creating the token");
            return error;
        }
    }

    validateToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong while validating the token");
            return error;
        }
    }
}

module.exports = UserService;