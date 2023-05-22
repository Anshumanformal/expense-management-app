const express = require("express")
const router = express.Router()
const {UserController} = require("../controllers/index")

// Login User
router.post("/login", UserController.loginController)

// Register User
router.post("/register", UserController.registerController)