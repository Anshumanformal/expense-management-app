const express = require("express")
const router = express.Router()
const { Controller } = require("../controllers/index")

// Add transaction
router.post("/add-transaction", Controller.addTransaction)

// Get all transactions of a user
router.post("/get-all-transactions", Controller.getAllTransactions)

module.exports = router