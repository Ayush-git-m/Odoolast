const Delivery = require("../models/Delivery");
const Product = require("../models/Product");
const StockMovement = require("../models/StockMovement");
exports.createDelivery = async (req, res) => {

  try {

    const { customer, product, quantity } = req.body;

    const prod = await Product.findById(product);

    if (!prod) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (prod.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const delivery = await Delivery.create({
      customer,
      product,
      quantity
    });
await StockMovement.create({
  product: product,
  type: "delivery",
  quantity: quantity,
  note: "Stock delivered to customer"
});
    // decrease stock
    prod.stock -= quantity;

    await prod.save();

    res.status(201).json(delivery);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};