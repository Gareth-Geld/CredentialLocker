const mongoose = require('mongoose');

let OUCard = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    divisions: {
        type: Number,
        required: true
    }
});

let OUModel = mongoose.model('organisationalunits', OUCard);

module.exports = OUModel;