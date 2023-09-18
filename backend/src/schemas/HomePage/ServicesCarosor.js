
const mongoose = require('mongoose')

const ServicesCarosor = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle:{
        type: String,
        required: true,
    }
    ,
    photoURL:{
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('ServicesCarosor',ServicesCarosor);