const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:false
    },
    phoneNumber:{
        type:String,
        required:false
    },
    cart:{
        type:String,
        required:false
    },
    orders:{
        type:String,
        required:false
    }
}, {timestamps: true});

const Users = mongoose.model('Users' , userSchema);
module.exports = Users;