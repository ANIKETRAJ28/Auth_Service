const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");
const { User, Role } = require("./models/index");

// const UserRepository = require("./repository/user-repository");
// const UserService = require("./services/user-service");

const serverSetup = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use("/api", apiRoutes);

    app.listen(PORT, async () => {
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
        console.log(`server started at port ${PORT}`);
        // const repository = new UserRepository();
        // const response = await repository.getById(5);
        // console.log(response);
        // const user = {"email": "adam@admin.com", "id": 6};
        // const userService = new UserService();
        // const newUser = userService.createToken(user);
        // console.log(newUser);
        // const newToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkYW1AYWRtaW4uY29tIiwiaWQiOjYsImlhdCI6MTcwNjUyMDg3NCwiZXhwIjoxNzA2NTIwOTM0fQ.DZojxsvrQ4rNFNry8vkMriFjmzoBlnZ2AwsCCDNErBk"
        // const verifyUser = userService.validateToken(newToken);
        // console.log(verifyUser);

        const u1 = await User.findByPk(8);
        const r1 = await Role.findByPk(1);
        u1.addRole(r1);
    });
}

serverSetup();