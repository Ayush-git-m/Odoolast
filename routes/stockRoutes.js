const express = require("express");

const { getStockHistory } = require("../controllers/stockController");

const router = express.Router();

router.get("/history", getStockHistory);

module.exports = router;