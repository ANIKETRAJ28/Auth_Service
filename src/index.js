const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");

const serverSetup = () => {

    app.listen(PORT, () => {
        console.log(`server started at port ${PORT}`);
    });
}

serverSetup();