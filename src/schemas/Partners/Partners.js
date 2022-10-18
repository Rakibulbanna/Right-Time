const mongoose = require('mongoose')

const Partners = mongoose.Schema({
    ServicePartner:{
        url:{
            type:String
        }
    },

SolutionPartner:{
    url:{
        type:String
    }
},
Association:{
    url:{
        type:String
    }
}

})

module.exports = mongoose.model('Partners',Partners);