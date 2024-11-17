"use strict"

const User = require("../models/user")

module.exports = {
    list: async (req, res) => {
        const result = await User.find()
        res.status(200).send({
            error: false,
            result
        })
    },
    create: async (req, res) => {
        const result = await User.create(req.body)
        res.status(201).send({
            error: false,
            result
        })
    },
    read: async (req, res) => {
 
        const result = await User.findById(req.params.userId)
        res.status(200).send({
            error: false,
            result
        })
    },
    update: async (req, res) => {
                
        const result = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        res.status(202).send({
            error: false,
            result
        })
    },
    delete: async (req, res) => {
        console.log(req.params);
        // console.log(req.body);
        const {deletedCount} = await User.deleteOne({_id: req.params.userId})
        if (deletedCount) res.sendStatus(204)
        else throw new Error("Something went wrong!")        
    },
}