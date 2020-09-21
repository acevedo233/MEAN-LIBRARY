const mongoose = require('mongoose');
const { Schema } = mongoose;

const OperationsSchema = new Schema({
    date: Date,
    book: Boolean,
    magazine: Boolean,
    book_id: {
        type: Schema.ObjectId, 
        ref: 'books'
    },
    magazine_id: {
        type: Schema.ObjectId,
        ref: 'magazines'
    },
    return: Boolean,
    return_date: Date,
    user_id: {
        type: Schema.ObjectId,
        ref: 'users'
    }
  });

module.exports = mongoose.model('Operations', OperationsSchema);