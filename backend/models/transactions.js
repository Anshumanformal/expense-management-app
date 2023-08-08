const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    userId : {
        type : String,
        required : [true, 'userId is required']
    },
    amount : {
        type : Number,
        required : [true, 'Amount is required']
    },
    type : {
        type : String,
        required : [true, 'type is required']
    },
    category : {
        type : String,
        required : [true, 'Category is required']
    },
    reference : {
        type : String
    },
    description : {
        type : String,
        required : [true, 'Description is required']
    },
    date : {
        type : String,
        required : [true, 'Date is required']
    }
    },
    {timeStamps : true}
)

module.exports.transactionModel = mongoose.model('transactions', transactionSchema)
