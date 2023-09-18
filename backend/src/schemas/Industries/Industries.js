const mongoose = require('mongoose')

const Industries = mongoose.Schema({
        name :{
            type : String,
            required:true,
            unique:true
        },
        coverPhoto:{
            type:String,
            require: true
        },
        div:{
            type: String,
            require: true
        }
    
})

module.exports = mongoose.model('Industries',Industries);