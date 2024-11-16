"use strict"

const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 8000
/* ----------------------------------- */
// Middlewares:
app.use(express.json())
require('express-async-errors')
/* ----------------------------------- */

// DB connection
require("./src/configs/dbConnection")
/* ----------------------------------- */



/* ----------------------------------- */
// Error Handler - Catch error
app.use(require("./src/middlewares/errorHandler"))
/* ----------------------------------- */
app.listen(PORT, () => console.log("Running: http//127.0.0.1:" + PORT))
