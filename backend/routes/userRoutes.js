const express = require("express")
const router = express.Router()
const { Controller } = require("../controllers/index")

// Login User
router.post("/login", Controller.loginController)

// Register User
router.post("/register", Controller.registerController)

module.exports = router