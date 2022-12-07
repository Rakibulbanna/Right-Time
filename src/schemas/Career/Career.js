const mongoose = require("mongoose");

const Career = mongoose.Schema({
  title: {
    type: String,
  },
  coverPhoto: {
    type: String,
    
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Career", Career);
