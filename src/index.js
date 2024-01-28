const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const serverSetup = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use("/api", apiRoutes);

    app.listen(PORT, () => {
        console.log(`server started at port ${PORT}`);
    });
}

serverSetup();