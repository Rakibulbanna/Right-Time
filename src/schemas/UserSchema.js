const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,  
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    photoURL:{
        type:String
    },
    confirmPassword:{
        type:String,
        require:true
    },
    emailVerified: Boolean,
    uid: {
        type:String,
        unique:true
    },
    date: {
        type:Date,
        default:Date.now,
    }
})
//const User = mongoose.model("user", userSchema);
//module.exports = User;
module.exports = userSchema;
