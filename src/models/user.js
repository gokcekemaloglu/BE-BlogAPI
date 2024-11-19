"use strict"

const {Schema, model} = require("mongoose")

/* ------------------------------------------------------- */
const passwordEncrypt = require("../helpers/passwordEncrypt")
/* ------------------------------------------------------- */


const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required!"],
        validate: [
            (email) => (email.includes("@") && email.includes(".")),
            "Please enter a valid email address"
        ] //????????????
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required!"],
        set: (password) => (password.length >= 5 ? passwordEncrypt(password) : "InvalidPassword"),
        validate: (password) => password != "InvalidPassword"
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    firstName: String,
    lastNAme: String,
}, {
    collection: "user",
    timestamps: true
})

module.exports = model("User", UserSchema)

