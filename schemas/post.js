const mongoose = require('mongoose')

const postingSchema = new mongoose.Schema({
    postingId: {
        type: Number,
        required: true,
        unique: true,
    },
    postName: {
        type: String,
        required: true,
    },
    postContent: {
        type: String,
        required: true,
    },
    postingDate: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: Number,
        required: true,
    },
    
})

module.exports = mongoose.model('Posting', postingSchema)

