"use strict"

const {Schema, model} = require("mongoose")

const BlogCategorySchema = new Schema({
    // _id,
    name: {
        type: String,
        required: true,
        trim: true
    }
},{
    collection: 'BlogCategory',
    timestamps: true
})

const BlogPostSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "BlogCategory",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
},{
    collection: 'BlogPost',
    timestamps: true
})

module.exports = {
    BlogCategory: model("BlogCategory", BlogCategorySchema),
    BlogPost: model("BlogPost", BlogPostSchema),
}