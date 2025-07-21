import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchPage({
  SelectedCategory = "All",
  searchQuery = "",
  darkMode,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    fetchProducts(SelectedCategory);
  }, [SelectedCategory]);

  const fetchProducts = async (category = "All") => {
    setLoading(true);
    try {
      const normalizedCategory = category?.trim() || "All";
      const url =
        normalizedCategory === "All"
          ? "http://localhost:5050/api/products"
          : `http://localhost:5050/api/products?category=${encodeURIComponent(
              normalizedCategory
            )}`;

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };
  
  if (!searchQuery.trim()) return null;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-[1500px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 relative ${
        darkMode ? "bg-gray-900 text-white" : "bg-neutral-100 text-gray-900"
      }`}
    >
      {filteredProducts.length === 0 ? (
        <p
          className={`text-center text-lg mt-10 ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          No products found matching "<strong>{searchQuery}</strong>"
        </p>
      ) : (
        <div className="relative">
          <div
            id="top-products-scroll"
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-1"
          >
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => setZoom(item.image)}
                className={`min-w-[220px] max-w-[230px] cursor-pointer rounded-2xl p-3 shadow-md transition-transform transform hover:scale-105 ${
                  darkMode
                    ? "bg-black border border-gray-700 text-white"
                    : "bg-white border border-gray-200 text-gray-900"
                }`}
              >
                {item.oldPrice && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded font-bold mb-2 inline-block">
                    Sale!
                  </span>
                )}
                <div className="h-32 flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-300 rounded-xl overflow-hidden mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                </div>
                <h3 className="text-sm font-semibold text-center">
                  {item.name}
                </h3>
                <p className="text-xs text-center line-clamp-2">
                  {item.description}
                </p>
                <div className="text-center mt-2 text-red-600 font-bold">
                  ₹{item.price}
                  {item.oldPrice && (
                    <span className="text-gray-400 text-xs ml-2 line-through">
                      ₹{item.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setZoom(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={zoom}
              alt="Zoomed"
              className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[75%] rounded-xl shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
