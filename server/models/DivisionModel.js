const mongoose = require('mongoose');

let DivCard = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ou: {
        type: String,
        required: true
    }
});

let DivModel = mongoose.model('divisions', DivCard);

module.exports = DivModel;