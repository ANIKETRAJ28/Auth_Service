const dotenv = require("dotenv");
const bcrypt = require("bcrypt"); // bcrypt is a npm package which is used to encrypt the password for not be midleading

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(10),
    JWT_KEY: process.env.JWT_KEY
};