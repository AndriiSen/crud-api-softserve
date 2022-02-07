const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hobbies: {
        type: String,
        required: false
    }
});

const User = mongoose.model('User', UserSchema)
module.exports = User;