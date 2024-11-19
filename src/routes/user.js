"use strict"

const router = require("express").Router()
/* --------------------------------------------- */

// Controller
const {list, create, read, update, deleteUser} = require("../controllers/user")

// Routes

router.route("/")
    .get(list)
    .post(create)

router.route("/:userId")
    .get(read)
    .put(update)
    .patch(update)
    .delete(deleteUser)

module.exports = router