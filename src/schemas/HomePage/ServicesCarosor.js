
const mongoose = require('mongoose')

const ServicesCarosor = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    iconURL:{
        type: String,
        required: true,
    }

});

module.exports = ServicesCarosor;