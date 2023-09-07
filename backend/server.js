"use strict"

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const path = require("path")

// Connect to the database
require("./config/mongodb_connection").connectMongoDB()

const app = express()

app.use(morgan("dev"))
app.use(express.json())

// const corsOptions = {
//   origin: ["https://anshumanformal-automatic-orbit-w9r665577g4c9jvg-8081.preview.app.github.dev", "https://anshumanformal-automatic-orbit-w9r665577g4c9jvg-8080.preview.app.github.dev/", "https://anshumanformal-automatic-orbit-w9r665577g4c9jvg-37903.preview.app.github.dev/"],
// }

// app.use(cors(corsOptions))
app.use(cors())

// Static files
app.use(express.static(path.join(__dirname, '../client/build')))
app.get("*", (req, res)=> {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

// user routes
app.use("/api/v1/users", userRoutes)
// transaction routes
app.use("/api/v1/transactions", transactionRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`.bgWhite)
})