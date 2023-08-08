const UserController = require("./userController")
const TransactionController = require("./transactionController")

module.exports.Controller = {
    // User Controllers
    loginController: UserController.loginController,
    registerController: UserController.registerController,

    // Transaction Controllers
    addTransaction: TransactionController.addTransaction,
    getAllTransactions: TransactionController.getAllTransactions
}