
const mongoose = require('mongoose')

const ClientCarousel = mongoose.Schema({
    
    photoURL:{
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('ClientCarousel',ClientCarousel);