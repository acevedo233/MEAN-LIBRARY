const mongoose = require('mongoose');
const { Schema } = mongoose;

const MagazineSchema = new Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    edition: {type: Number, default: '0'},
    description: {type: String, required: true},
    frequency: {type: String, required: true},
    copy: {type: String, required: true},
    topics: [],
    keywords: [],
    copies: {type: Number, default: '0'},
    available: {type: Number, default: '0'},
    loan: {type: Number, default: '0'},
    search: {type: Number, default: '0'}
});

module.exports = mongoose.model('Magazine', MagazineSchema);