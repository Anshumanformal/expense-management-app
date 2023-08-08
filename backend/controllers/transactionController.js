const {transactionModel} = require("../models/transactions")

const addTransaction = async(req, res) => {
    try {
        await transactionModel.create(req.body)
        res.status(201).json({
            success: true,
            message: "Transaction Created"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}
const getAllTransactions = async(req, res) => {
    try {
        const transactions = await transactionModel.find({userId : req.params.userId})
        res.status(201).json({
            success: true,
            transactions
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

module.exports = {
    addTransaction,
    getAllTransactions
}