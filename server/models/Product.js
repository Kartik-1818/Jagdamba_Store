const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: [String], required: true }, 
    price: { type: Number },
    image: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Products = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Products;
