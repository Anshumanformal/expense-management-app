const mongoose = require("mongoose")

const { MONGODB_URL } = process.env

module.exports.connectMongoDB = async()=> {
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Server running on ${mongoose.connection.host}`.bgCyan.white)
    } catch (error) {
        console.log(`${error}`.bgRed)
    }
}

