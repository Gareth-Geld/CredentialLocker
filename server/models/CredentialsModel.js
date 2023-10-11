const mongoose = require('mongoose');

let CredCard = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: "Website"
    },
    ou: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    }
});

let CredModel = mongoose.model('credentials', CredCard);

module.exports = CredModel;
