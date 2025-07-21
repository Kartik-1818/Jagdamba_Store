import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductSec from "../components/ProductSection";
import CategoriesPage from "../components/Category";
import HeroBanner from "../components/HeroBanner";
import { motion, AnimatePresence } from "framer-motion";
import img2 from "../assets/JAI MATA DI.jpg";
import SearchPage from "../components/SearchPage";

const HomePage = ({ onToggleDarkMode, darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSplash, setShowSplash] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const splashSeen = localStorage.getItem("splashSeen");
    if (!splashSeen) {
      setShowSplash(true);
    }
  }, []);

  const handleGetStarted = () => {
    localStorage.setItem("splashSeen", "true");
    setShowSplash(false);
  };

  return (
    <>
      {/* Splash screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center border border-white m-4 bg-black text-white text-center px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.img
              src={img2}
              alt="Laxmi Mata"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="w-40 h-40 mx-auto mb-4"
            />

            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-extrabold mb-2"
            >
              Welcome to
              <br />
              Jagdamba Store
            </motion.h1>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6 text-lg text-gray-300"
            >
              Discover the best stationery products
            </motion.p>

            <motion.button
              onClick={handleGetStarted}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.7 }}
              className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-300 transition-all"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <div
          className={`min-h-screen flex flex-col transition-colors duration-500 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
          }`}
        >
          <Navbar
            username={username}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchQuery}
            onToggleDarkMode={onToggleDarkMode}
            darkMode={darkMode}
          />

          <main className="flex-grow">
            <HeroBanner />
            <SearchPage SelectedCategory={selectedCategory} searchQuery={searchQuery} darkMode={darkMode}/>
            <CategoriesPage darkMode={darkMode} />
            <ProductSec
              SelectedCategory={selectedCategory}
              searchQuery={searchQuery}
              darkMode={darkMode}
            />     
          </main>
          <Footer darkMode={darkMode} />
        </div>
      )}
    </>
  );
};

export default HomePage;
