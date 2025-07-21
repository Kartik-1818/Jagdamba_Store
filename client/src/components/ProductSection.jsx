import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductSection({ darkMode }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://jagdamba-store.onrender.com/api/products/category/Top Products");
      console.log("✅ Top Products Response:", res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch top products", error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (dir) => {
    const container = document.getElementById("top-products-scroll");
    const amount = 300;
    container.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 max-w-[1500px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          Top Products
        </h2>
        <button onClick={() => navigate("/products/Top Products")} className="text-red-500 font-semibold hover:underline text-sm">
          View all →
        </button>
      </div>

      <div className="relative">
        {/* LEFT ARROW */}
        {products.length > 1 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full"
          >
            <FaChevronLeft className={`${darkMode ? "text-gray-900" : "text-black"}`} />
          </button>
        )}

        <div
          id="top-products-scroll"
          className={`flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-1 ${
            products.length === 1 ? "justify-center" : ""
          }`}
        >
          {products.map((item) => (
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
              <h3 className="text-sm font-semibold text-center">{item.name}</h3>
              <p className="text-xs text-center">{item.description}</p>
              <div className="text-center mt-2 text-red-600 font-bold">
                ₹{item.price}
                {item.oldPrice && (
                  <span className="text-gray-400 text-xs ml-2 line-through">₹{item.oldPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        {products.length > 1 && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-md p-2 rounded-full"
          >
            <FaChevronRight className={`${darkMode ? "text-gray-900" : "text-black"}`} />
          </button>
        )}
      </div>

      {/* Zoom modal */}
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


