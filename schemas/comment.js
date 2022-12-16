const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commentId: {
        type: Number,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    Date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)