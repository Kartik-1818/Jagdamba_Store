const express = require("express");
const router = express.Router();
const Product = require("../models/Product")

router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;