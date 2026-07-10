const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  sku: {
    type: String,
    unique: true
  },

  category: {
    type: String
  },

  unit: {
    type: String
  },

  stock: {
    type: Number,
    default: 0
  },

  warehouse: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);