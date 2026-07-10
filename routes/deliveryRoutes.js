const express = require("express");

const { createDelivery } = require("../controllers/deliveryController");

const router = express.Router();

router.post("/", createDelivery);

module.exports = router;