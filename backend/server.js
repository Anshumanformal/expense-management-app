"use strict"

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()
const colors = require("colors")

// Connect to the database
require("./config/mongodb_connection").connectMongoDB()

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("<h1>Hello from the server</h1>")
})

const PORT = 8080 || process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`.bgWhite)
})