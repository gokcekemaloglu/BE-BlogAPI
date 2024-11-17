"use strict"

const {Schema, model} = require("mongoose")

/* ------------------------------------------------------- */
// Encryption

/* ------------------------------------------------------- */

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required!"]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is required!"]
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

