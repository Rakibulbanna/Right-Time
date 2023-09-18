const mongoose = require("mongoose");

const Contact = mongoose.Schema({
    fullName: {
      type: String,
    },
    address:{
      type: String
    },
    type:{
      type: String
    },
    companyName:{
      type: String
    },
    country:{
      type: String
    },
    interested:{
      type: String
    },
    budget:{
      type: String
    },
    phone:{
      type: String
    },
    email:{
      type: String
    },
    message: {
      type: String,
    },
    hearAboutUs: {
      type: String,
    },
});

module.exports = mongoose.model("Contact", Contact);
