const mongoose = require('mongoose');

const SecurityTraining = mongoose.Schema({
    
        name: {
          type: String,
        },
        UI: {
          coverPhoto: {
            type: String,
            require: true,
          },
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
module.exports = mongoose.model('SecurityTraining',SecurityTraining);