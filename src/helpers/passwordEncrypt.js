"use strict"

// Encryption

const crypto = require("node:crypto")

// parameters

const keyCode = process.env.SECRET_KEY // secretKey for enc
const loopCount = Number(process.env.LOOP_COUNT)// number of loops
const charCount = Number(process.env.CHAR_COUNT) // write 32 for 64
const encType = process.env.ENC_TYPE // Type of algorithm

/* ------------------------------------------------------- */
module.exports = (password) => {
    return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString("hex")
}


