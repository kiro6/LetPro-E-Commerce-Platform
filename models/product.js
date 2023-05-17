const mongoose = require("mongoose");
const Schema = mongoose.Schema;





const producSize = new Schema(
  {
   
  small : {
    type : String , 
    required : true
  },
  meduim : {
    type : String , 
    required : true
  },
  large : {
    type : String , 
    required : true
  },
  xlarge : {
    type : String , 
    required : true
  },


  },
  { timestamps: true }
);


const productSchema = new Schema(
  {
   
    productId: {
      type: String,
      required: true,
    },
    producDetails: {
      type : producSize  ,
      required : true 
    } 

  },
  { timestamps: true }
);

const product = mongoose.model("userProduct", productSchema);
module.exports = product;
