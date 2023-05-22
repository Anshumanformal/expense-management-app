const UserController = require("./userController")

module.exports.UserController = {
    loginController: UserController.loginController,
    registerController: UserController.registerController
}