const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    edition: {type: Number, default: '0'},
    keywords: [],
    description: {type: String, required: true},
    topics: [],
    copies: {type: Number, default: '0'},
    available: {type: Number, default: '0'},
    loan: {type: Number, default: '0'},
    search: {type: Number, default: '0'}
});

module.exports = mongoose.model('Book', bookSchema);