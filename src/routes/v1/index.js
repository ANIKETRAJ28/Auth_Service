const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controllers");

router.post("/signup", UserController.create);

module.exports = router;