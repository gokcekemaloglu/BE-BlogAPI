"use strict"

//  $ npm i mongoose

const mongoose = require("mongoose")

module.exports = mongoose.connect(process.env.MONGOURI || "mongodb://localhost:27017/blogAPI")
    .then(()=>console.log("*DB Connected*"))
    .catch(()=>console.log("*DB Not Connected*"))

