const mongoose = require('mongoose');

const Consultation = mongoose.Schema({
    
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
module.exports = mongoose.model('ConsultationServices',Consultation);