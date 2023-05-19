const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tshirtSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  variants: [{
    color: {
      type: String,
      required: true
    },
    sizes: [{
      size: {
        type: String,
        required: true
      },
      quantityLeft: {
        type: Number,
        required: true
      }
    }]
  }],
  price:{
    type: Number,
    required: true
  }
});

const Tshirt = mongoose.model('Tshirts', tshirtSchema);

const bagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  variants: [{
    color: [{
      name: {
        type: String,
        required: true
      },
      quantityLeft: {
        type: Number,
        required: true
      }
    }]
  }],
  price:{
    type: Number,
    required: true
  }
});

const Bag = mongoose.model('bags', bagSchema);

const watchSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  variants: [{
    color: [{
      name: {
        type: String,
        required: true
      },
      quantityLeft: {
        type: Number,
        required: true
      }
    }]
  }],
  price:{
    type: Number,
    required: true
  }
});

const Watch = mongoose.model('Watches', watchSchema);

module.exports = Tshirt , Bag , Watch;
