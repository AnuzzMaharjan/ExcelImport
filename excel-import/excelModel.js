const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    }
})

module.exports = mongoose.model('User', userModel);