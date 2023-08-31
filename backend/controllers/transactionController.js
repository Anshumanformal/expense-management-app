const {transactionModel} = require("../models/transactions")
const moment = require('moment')

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
      const { frequency, userId, selectedDate, type } = req.body;
      const transactions = await transactionModel.find({
        userId,
        ...(frequency !== 'custom' ? {
          date: { $gt: moment().subtract(Number(frequency), 'd').toDate() }
        } : {
          date: { $gte: selectedDate[0], $lte: selectedDate[1] }
        }),
        ...(type !== "all" && {type})
      }).lean().exec();
      res.status(201).json({
        success: true,
        transactions
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error
      });
    }
  };

module.exports = {
    addTransaction,
    getAllTransactions
}