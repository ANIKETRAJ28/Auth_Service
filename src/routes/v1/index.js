const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controllers");
const { AuthReqvalidateUser } = require("../../middlewares/index");

router.post("/signup", AuthReqvalidateUser.validateUser, UserController.create);
router.post("/signin", AuthReqvalidateUser.validateUser, UserController.signIn);

module.exports = router;