const mongoose = require("mongoose");

const adjustmentSchema = new mongoose.Schema({

  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },

  old_stock:Number,

  new_stock:Number,

  location:String

},{timestamps:true});

module.exports = mongoose.model("Adjustment",adjustmentSchema);