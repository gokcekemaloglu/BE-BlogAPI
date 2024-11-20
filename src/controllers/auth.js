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
                    // Session
                    req.session._id = user._id
                    req.session.password = user.password
                    // Cookie
                    if (req.body.rememberMe == true) { //?????????
                        req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 2
                    }
                    res.send({
                        error: false,
                        message: "Login Successfull",
                        user
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
        req.session = null
        res.status(200).send({
            error: false,
            message: "Logout Successfull"
        })
    },
}
