const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProductSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number.isInteger ,
      required: true,
    },
  },
  { timestamps: true }
);

const userProduct = mongoose.model("userProduct", userProductSchema);
module.exports = userProduct;
