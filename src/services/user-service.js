const UserRepository = require("../repository/user-repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const AppError = require("../utils/error-handler");
const { StatusCodes } = require("http-status-codes");

const userRepository = new UserRepository();

class UserService {

    async create(data) {
        try {
            const response = await userRepository.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in user-service layer");
            throw error;
        }
    }

    async destroy(id) {
        try {
            const response = await userRepository.destroy(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in user-service layer");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
            return result;
        } catch (error) {
            console.log("Something went wrong while creating the token");
            throw error;
        }
    }

    validateToken(token) { // this will validate the user and send the response as user object
        try {
            const response = jwt.verify(token, JWT_KEY);
            console.log(response);
            return response;
        } catch (error) {
            console.log("Something went wrong while validating the token");
            throw new AppError();
        }
    }

    checkPassword(plinePassword, userPassoord) {
        // compares the encrypted password of the user with the password provided by the user
        try {
            return bcrypt.compareSync(plinePassword, userPassoord);
        } catch (error) {
            console.log("Something went wrong while validating the token");
            throw new AppError();
        }
    }

    async signIn(email, password) {
        try {
            // step1-> fetch the user using email
            const user = await userRepository.getByEmail(email);
            // step2-> compare the password to validate user
            const passwordMatch = this.checkPassword(password, user.password);
            if(!passwordMatch) {
                // password didn't matched
                throw new AppError(
                    "AppError",
                    "Password doesn't match",
                    "Incorrect password please try again",
                    StatusCodes.BAD_REQUEST
                );
            }
            // step3-> generating the token for valid user
            const newJWTtoken = this.createToken({email:user.email, id:user.id});
            return newJWTtoken;
        } catch (error) {
            console.log("Something went wrong while validating the token");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.validateToken(token);
            if(!response) {
                throw {error: "invalid token"}
            }
            const user = await userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            const user = await userRepository.isAdmin(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

module.exports = UserService;