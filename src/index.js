const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
// const UserRepository = require("./repository/user-repository");

const serverSetup = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use("/api", apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at port ${PORT}`);
        // const repository = new UserRepository();
        // const response = await repository.getById(5);
        // console.log(response);
    });
}

serverSetup();