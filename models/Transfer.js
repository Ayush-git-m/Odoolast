const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({

  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },

  from_location:String,

  to_location:String,

  quantity:Number

},{timestamps:true});

module.exports = mongoose.model("Transfer",transferSchema);