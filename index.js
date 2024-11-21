"use strict"

const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 8000
/* ----------------------------------- */
// Middlewares: 
app.use(express.json()) // ???
require('express-async-errors') // ??
/* ----------------------------------- */

// Cookie-Session
const session = require("cookie-session")
app.use(session({
    secret: process.env.SECRET_KEY
}))

/* ----------------------------------- */
// Authentication
app.use(require("./src/middlewares/authentication"))
/* ----------------------------------- */
// Query Handler
app.use(require("./src/middlewares/queryHandler"))

/* ----------------------------------- */

// DB connection
require("./src/configs/dbConnection")
/* ----------------------------------- */

/* ----------------------------------- */

// Routes
app.all("/", (req, res)=>{
    res.send({
        message: "WELCOME!! :)",
        session: req.session,
        isLogin: req.session ? true : false
    })
    
})

app.use("/blog", require("./src/routes/blog"))
app.use("/user", require("./src/routes/user"))
app.use("/auth", require("./src/routes/auth"))


/* ----------------------------------- */
// Error Handler - Catch error
app.use(require("./src/middlewares/errorHandler"))
/* ----------------------------------- */
app.listen(PORT, () => console.log("Running: http//127.0.0.1:" + PORT))
/* ------------------------------------------------------- */
//! Syncronization : Run it only once.
// require('./sync')()