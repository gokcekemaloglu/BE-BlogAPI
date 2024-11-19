"use strict"

const { login, logout } = require("../controllers/auth")

const router = require("express").Router()

router.post("/login", login)
router.get("/login", logout)

module.exports = router