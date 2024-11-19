"use strict"

const passwordEncrypt = require("../helpers/passwordEncrypt")
const User = require("../models/user")

module.exports = {
    login: async( req, res) => {
        const {email, password} = req.body
        if (email && password) {
            // User.findOne({email: email})
            const user = await User.findOne({email})
            if (user) {
                if (user.password === passwordEncrypt(password)) {
                    res.send({
                        error: false,
                        message: "Login Successfull",
                    })
                } else {
                    res.errorStatusCode = 401
                    throw new Error("Wrong email or password!")
                }                              
            } else {
                res.errorStatusCode = 401
                throw new Error("Wrong email or password!")
            }
        } else {
            res.errorStatusCode = 401
            throw new Error("Please enter email and password!")
        }
    },
    logout: async( req, res) => {
        res.send({
            error: false,
            message: "Login Successfull",
        })
    },
}
