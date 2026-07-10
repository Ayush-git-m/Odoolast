const StockMovement = require("../models/StockMovement");

exports.getStockHistory = async (req,res)=>{
  try{

    const history = await StockMovement
      .find()
      .populate("product");

    res.json(history);

  }catch(error){
    res.status(500).json({message:error.message});
  }
};
