const Product = require("../models/Product");

exports.getDashboard = async(req,res)=>{

  const totalProducts = await Product.countDocuments();

  const lowStock = await Product.countDocuments({
    stock:{$lt:10}
  });

  res.json({
    totalProducts,
    lowStock
  });

};