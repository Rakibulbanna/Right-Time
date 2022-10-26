const mongoose = require('mongoose');

const Management = mongoose.Schema({
    
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
module.exports = mongoose.model('Management',Management);