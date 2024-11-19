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

// DB connection
require("./src/configs/dbConnection")
/* ----------------------------------- */

/* ----------------------------------- */

// Routes
app.all("/", (req, res)=>{
    res.send({
        message: "WELCOME!! :)",
        session: req.session,
    })
    
})

app.use("/blog", require("./src/routes/blog"))
app.use("/user", require("./src/routes/user"))


/* ----------------------------------- */
// Error Handler - Catch error
app.use(require("./src/middlewares/errorHandler"))
/* ----------------------------------- */
app.listen(PORT, () => console.log("Running: http//127.0.0.1:" + PORT))
