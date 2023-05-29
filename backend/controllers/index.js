const UserController = require("./userController")

module.exports.Controller = {
    loginController: UserController.loginController,
    registerController: UserController.registerController
}