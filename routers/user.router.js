const express = require("express");
const userRouter = express.Router();
const { registerUser, findUser, getUser } = require("../controllers/user.controller.js");
const authentication = require("../middlewares/authentication.js");

userRouter
.post('/signUp', registerUser)
.post('/login', findUser)
.get("/login", authentication, getUser)


module.exports = userRouter