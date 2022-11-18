
const mongoose = require('mongoose')

const AssociationCarosor = mongoose.Schema({
   
    photoURL:{
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('AssociationCarosor',AssociationCarosor);