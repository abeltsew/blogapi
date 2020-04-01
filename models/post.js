const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,
    body: String
})

module.exports = mongoose.model('posts', postSchema)