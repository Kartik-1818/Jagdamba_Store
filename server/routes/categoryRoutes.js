// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Product = require("../models/Product")

// Add a new category
router.post("/", async (req, res) => {
  try {
    const newCat = new Category({ name: req.body.name });
    await newCat.save();
    res.status(201).json({ message: "Category added" });
  } catch (err) {
    res.status(500).json({ error: "Error adding category" });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Delete category
router.delete("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deleted = await Category.findByIdAndDelete(categoryId);
    if (!deleted) {
      return res.status(404).json({ message: "category not found" });
    }
    await Product.updateMany( {category : deleted.name}, { $set : {category : "Others"}} )
    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete", error });
  }
});


module.exports = router;
