const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({

  supplier: {
    type: String,
    required: true
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  quantity: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["draft","done"],
    default: "done"
  }

}, { timestamps: true });

module.exports = mongoose.model("Receipt", receiptSchema);