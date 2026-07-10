const Transfer = require("../models/Transfer");

exports.createTransfer = async (req, res) => {
  try {

    const { product, from_location, to_location, quantity } = req.body;

    const transfer = await Transfer.create({
      product,
      from_location,
      to_location,
      quantity
    });

    res.json(transfer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};