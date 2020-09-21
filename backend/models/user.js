const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    identifier:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    rol: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }

},{
    timestamps: true

});

module.exports = mongoose.model('User', userSchema);
