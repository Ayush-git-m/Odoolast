const Receipt = require("../models/Receipt");
const Product = require("../models/Product");
const StockMovement = require("../models/StockMovement");
exports.createReceipt = async (req, res) => {

  try {

    const { supplier, product, quantity } = req.body;

    const receipt = await Receipt.create({
      supplier,
      product,
      quantity
    });
await StockMovement.create({
  product: product,
  type: "receipt",
  quantity: quantity,
  note: "Stock received from supplier"
});

    // stock increase
    const prod = await Product.findById(product);

    prod.stock += quantity;

    await prod.save();

    res.status(201).json(receipt);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};