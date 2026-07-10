const express = require("express");

const {
  createProduct,
  getProducts,
  getLowStock
} = require("../controllers/productController");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/low-stock", getLowStock);
module.exports = router;