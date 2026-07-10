const Product = require("../models/Product");

exports.createProduct = async (req, res) => {

  try {

    const { name, sku, category, unit, stock, warehouse } = req.body;

    const product = await Product.create({
      name,
      sku,
      category,
      unit,
      stock,
      warehouse
    });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
exports.getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


exports.getLowStock = async (req, res) => {

  try {

    const products = await Product.find({
      stock: { $lt: 10 }
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};