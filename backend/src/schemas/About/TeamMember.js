const mongoose = require('mongoose')

const TeamMember = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    imgUrl:{
        type:String
    }
    ,
    designation:{
        type: String,
        require: true
    },
    description:{
        type: String
    },
})

module.exports = mongoose.model('TeamMember',TeamMember);