const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    userId:{
    type:String , 
    required:true
    }
    ,
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
    cart: [
        {
          product: {
            type: Object,
            ref: 'Product',
            required: true
          },
          colorIndex: {
            type: Number,
            required: true
          },
          sizeIndex: {
            type: Number,
            required: false
          },
          quantity: {
            type: Number,
            required: true
          },
          price: {
            type: Number,
            required: true
          }
        }
      ],
    orderedProducts: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          color: {
            type: String,
            required: true
          },
          size: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          price: {
            type: Number,
            required: true
          },
          createAt: {
            type: String,
            required: true
          },
          status:{
            type: String,
            required: true
          }
        }
      ],
      cartTotalPrice: {
        type: Number,
        default: 0
      }
}, {timestamps: true});

const Users = mongoose.model('Users' , userSchema);
module.exports = Users;