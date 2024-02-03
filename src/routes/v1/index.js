const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controllers");
const { AuthReqvalidateUser, UserRoleValidator } = require("../../middlewares/index");

router.post("/signup", AuthReqvalidateUser.validateUser, UserController.create);
router.post("/signin", AuthReqvalidateUser.validateUser, UserController.signIn);
router.get("/isAuthenticated", UserController.isAuthenticated);
router.get("/isAdmin", UserRoleValidator.AdminRole, UserController.isAdmin);

module.exports = router;