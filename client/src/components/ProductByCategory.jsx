import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

const capitalizeWords = (str) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

const ProductsByCategory = ({ darkMode }) => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(null);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    fetchProducts(categoryName);
    document.title = `${capitalizeWords(
      categoryName.replace(/-/g, " ")
    )} | Jagdamba Store`;
  }, [categoryName]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#0e0e0e" : "#f9fafb";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [darkMode]);

  const fetchProducts = async (category = "All") => {
    setLoading(true);
    try {
      const normalizedCategory =
        category === "All"
          ? "All"
          : capitalizeWords(category.replace(/-/g, " ").trim());

      const url =
        normalizedCategory === "All"
          ? "https://jagdamba-store.onrender.com/api/products"
          : `https://jagdamba-store.onrender.com/api/products?category=${encodeURIComponent(
              normalizedCategory
            )}`;

      const res = await axios.get(url);
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredProducts(products);
    } else {
      const lowerTerm = term.toLowerCase();
      setFilteredProducts(
        products.filter(
          (item) =>
            item.name.toLowerCase().includes(lowerTerm) ||
            item.description.toLowerCase().includes(lowerTerm)
        )
      );
    }
  };

  const toggleShowMore = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={`max-w-full mx-auto px-4 md:px-8 py-6 min-h-[100vh] transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm font-medium hover:text-blue-500 transition"
        >
          <FaArrowLeft className="text-xl" /> Back
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-6 capitalize">
        {categoryName.replace(/-/g, " ")}
      </h2>

      <div className="flex items-center gap-2 max-w-md mx-auto mb-8">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className={`w-full p-2 rounded border outline-none transition-all ${
            darkMode
              ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />
      </div>

      {loading ? (
        <p className="text-center text-xl font-medium animate-pulse">
          Loading products...
        </p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-lg mt-10 text-gray-500">
          🛒 No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.03 }}
              className={`rounded-xl p-3 border transition-all cursor-pointer ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:border-cyan-300 hover:bg-gray-600"
                  : "bg-white border-gray-300 hover:shadow-md hover:bg-gray-100"
              }`}
              onClick={() => setZoom(item.image)}
            >
              <div className="w-full h-40 flex justify-center items-center mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full object-contain rounded-md"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150?text=No+Image";
                  }}
                />
              </div>

              <h3 className="text-sm font-semibold mb-1">{item.name}</h3>
              <p className = {`${
        darkMode ?  "text-gray-500" : "text-gray-800"}`}>
                {showMore[item._id]
                  ? item.description
                  : item.description.slice(0,70) + (item.description.length > 70 ? '...' : '')}
              </p>
              {item.description.length > 50 && (
                <button
                  className="text-blue-400 text-xs mt-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleShowMore(item._id);
                  }}
                >
                  {showMore[item._id] ? "Show Less" : "Show More"}
                </button>
              )}

              <p className="text-red-500 font-bold mt-1 text-base">₹{item.price}</p>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setZoom(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setZoom(null)}
              className="absolute top-6 right-6 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>
            <motion.img
              src={zoom}
              alt="Zoomed"
              className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[75%] rounded-xl shadow-2xl"
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsByCategory;
