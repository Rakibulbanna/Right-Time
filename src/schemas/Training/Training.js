const mongoose = require("mongoose");
const SecurityTraining = require('./SecurityTraining')
const Assessment = require('./Assessment')
const Management = require('./Management')
const Customized = require('./Customized')


const Training = mongoose.Schema({
  SecurityTraining: {
    type: mongoose.ObjectId,
    ref:'SecurityTraining',
    required:true
  },
  Assessment: {
    type: mongoose.ObjectId,
    ref:'Assessment',
    required:true
  },
  Management: {
    type: mongoose.ObjectId,
    ref:'Management',
    required:true
  },
  Customized: {
    type: mongoose.ObjectId,
    ref:'Customized',
    required:true
  },

});

// const Training = mongoose.Schema({
//   SecurityTraining: [{
//     name: {
//       type: String,
//     },
//     UI: {
//       coverPhoto: {
//         type: String,
//         require: true,
//       },
//       divTitle: {
//         type: String,
//         require: true,
//       },
//       divDescription: {
//         type: String,
//         require: true,
//       },
//     }
  
// }],
//   Assessment: [{ 
//     name: {
//       type: String,
//     },
//     UI: {
//       coverPhoto: {
//         type: String,
//         require: true,
//       },
//       divTitle: {
//         type: String,
//         require: true,
//       },
//       divDescription: {
//         type: String,
//         require: true,
//       },
//     }
  
// }],
//   Management: [{
//     name: {
//       type: String,
//     },
//     UI: {
//       coverPhoto: {
//         type: String,
//         require: true,
//       },
//       divTitle: {
//         type: String,
//         require: true,
//       },
//       divDescription: {
//         type: String,
//         require: true,
//       },
//     }
  
// }],
//   Customized: [{
//     name: {
//       type: String,
//     },
//     UI: {
//       coverPhoto: {
//         type: String,
//         require: true,
//       },
//       divTitle: {
//         type: String,
//         require: true,
//       },
//       divDescription: {
//         type: String,
//         require: true,
//       },
//     }
  
// }],

// });

module.exports = mongoose.model('Training',Training);