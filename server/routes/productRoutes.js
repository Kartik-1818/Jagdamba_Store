const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get ALL products with optional category query param
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    // const query = category && category !== "All" ? { category } : {};
    const query =
      category && category !== "All" ? { category: { $in: [category] } } : {};

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Get products by category param (case-insensitive)
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({
      category: { $in: [new RegExp(`^${category}$`, "i")] },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

console.log("✅ productRoutes loaded");

// Add new product
// POST - Create new product
router.post("/", async (req, res) => {
  try {
    console.log("📦 Incoming Product Data:", req.body); // Debug log

    
    if (req.body.category && !Array.isArray(req.body.category)) {
      req.body.category = [req.body.category];
    }
    const { name, category, price, image, description } = req.body;

    // Validate
    if (!name || !price || !category || !Array.isArray(category)) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    const newProduct = await Product.create({
      name,
      category,
      price : Number(price),
      image,
      description,
    });
    console.log("Final Payload for Create:", { name, category, price, image, description });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("AB" , err)
    console.log("📦 Incoming Product Data:", req.body);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body.category && !Array.isArray(req.body.category)) {
      req.body.category = [req.body.category];
    }
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating product:", err);
    res
      .status(500)
      .json({ message: "Failed to update product", error: err.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
});

module.exports = router;
