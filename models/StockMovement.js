const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema({

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },

  type: {
    type: String,
    enum: ["receipt","delivery","transfer","adjustment"],
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  note: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("StockMovement", stockMovementSchema);