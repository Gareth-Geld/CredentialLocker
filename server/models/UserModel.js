const mongoose = require('mongoose');

let UserCard = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "normal"
    },
    selectedOUs: {
        type: Array,
        required: true,
        default: ""
    },
    selectedDivisions: {
        type: Array,
        required: false,
        default: ""
    }
});

let UserModel = mongoose.model('users', UserCard);

module.exports = UserModel;
