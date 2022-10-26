const mongoose = require("mongoose");

const Training = mongoose.Schema({
  SecurityTraining: {
    type: mongoose.Types.ObjectId,
    ref:'SecurityTraining',
    required:true
  },
  Assessment: {
    type: mongoose.Types.ObjectId,
    ref:'Assessment',
    required:true
  },
  Management: {
    type: mongoose.Types.ObjectId,
    ref:'Management',
    required:true
  },
  Customized: {
    type: mongoose.Types.ObjectId,
    ref:'Customized',
    required:true
  },

});

module.exports = mongoose.model('Training',Training);