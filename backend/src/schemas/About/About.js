const mongoose = require('mongoose')

const About = mongoose.Schema({
    title:{
        type:String
    },
    divDescription:{
        type: String,
    }
})

module.exports = mongoose.model('About',About)