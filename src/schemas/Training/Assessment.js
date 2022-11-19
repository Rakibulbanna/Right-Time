const mongoose = require('mongoose');

const Assessment = mongoose.Schema({
    
        name: {
          type: String,
          require: true,
          unique: true
        }, 
        coverPhoto: {
            type: String,
            require: true,
          },
        UI: {
         
          divTitle: {
            type: String,
            require: true,
          },
          divDescription: {
            type: String,
            require: true,
          },
        }
      
})
module.exports = mongoose.model('Assessment',Assessment);