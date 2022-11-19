const mongoose = require('mongoose');

const Certification = mongoose.Schema({
    
        name: {
          type: String,
          require: true,
          unique: true
        },
       
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
        
      
})
module.exports = mongoose.model('CertificationServices',Certification);