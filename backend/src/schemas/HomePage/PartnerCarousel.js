const mongoose = require('mongoose')

const PartnerCarousel = mongoose.Schema({
    photoURL: {
    type:String,
    required: true
    }
})

module.exports = mongoose.model('PartnerCarousel',PartnerCarousel);