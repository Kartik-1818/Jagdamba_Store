import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaCog, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Navbar({
  onCategoryChange,
  onSearchChange,
  onToggleDarkMode,
  darkMode,
}) {
  const role = localStorage.getItem("role");
  console.log(role);
  // State to control the mobile menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  // State to store product categories fetched from API
  const [categories, setCategories] = useState([]);
  const [login, setlogin] = useState(false);
  const [hover, sethover] = useState(false);

  const navigate = useNavigate();

  // Fetch categories on initial render
  useEffect(() => {
    fetchCategories();
    const token = localStorage.getItem("token");
    if (token) setlogin(true);
  }, []);

  // Function to fetch categories from backend API
  const fetchCategories = async () => {
    try {
      // 1. Fetch categories from backend
      const res = await axios.get(
        "https://jagdamba-store.onrender.com/api/categories"
      );

      // 2. Fetch ALL products to check if any product is assigned to "Others"
      const productsRes = await axios.get(
        "https://jagdamba-store.onrender.com/api/products"
      );

      // 3. Check if ANY product has the category "Others"
      const hasOthers = productsRes.data.some((p) => p.category === "Others");

      // 4. Clone the category list from DB
      const categoryList = [...res.data];

      // 5. If "Others" exists in products but NOT in the category list, add it
      if (hasOthers && !categoryList.find((cat) => cat.name === "Others")) {
        categoryList.push({ name: "Others", _id: "others-generated" });
      }

      // 6. Update categories state with the final list including Others if needed
      setCategories(categoryList);
    } catch (err) {
      console.error("Error fetching categories or products", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setlogin(false);
    toast.success("Logged Out Successfully");
  };
  return (
    <nav
      className={`shadow-md px-4 md:px-8 py-4 flex flex-col fixed w-full z-50 ${
        darkMode ? "bg-gray-800 text-white" : "bg-neutral-100 text-gray-900"
      }`}
    >
      {/* TOP BAR: Logo + Desktop Controls */}
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Brand / Store Name */}
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          JAGDAMBA STORE
        </div>

        {/* Search Bar - Visible on Medium Screens and Above */}
        <div className="hidden md:flex w-1/3 relative">
          <input
            type="text"
            placeholder="Search for products"
            className={`w-full py-2 pl-4 pr-10 border rounded-full focus:outline-none focus:ring-1 ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-400"
                : "border-gray-300 focus:ring-gray-500"
            }`}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <FaSearch
            className={`absolute right-3 top-2.5 ${
              darkMode ? "text-gray-300" : "text-gray-800"
            }`}
          />
        </div>

        {/* Desktop Controls -> login/logout/register/admin/darkmode */}
        <div className="hidden md:flex items-center space-x-5 text-lg">
          {/* Category Dropdown */}
          <select
            id="category"
            className="..."
            onChange={(e) => {
              const selectedCategory = e.target.value;
              onCategoryChange(selectedCategory);
              if (selectedCategory === "All") {
                navigate("/");
              } else {
                navigate(
                  `/products/${selectedCategory
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`
                );
              }
            }}
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Dark Mode Toggle Switch */}
          <button
            onClick={onToggleDarkMode}
            className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                : "bg-gradient-to-r from-orange-400 to-pink-500"
            }`}
          >
            <div
              className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                darkMode ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {/* Dynamic SVG for sun/moon icon */}
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.75 12.003a9.72 9.72 0 01-2.24 6.263 9.729 9.729 0 01-6.26 2.243c-5.389 0-9.75-4.362-9.75-9.75 0-5.387 4.361-9.75 9.75-9.75a9.72 9.72 0 016.26 2.24 9.72 9.72 0 012.24 6.254z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-orange-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 3.75zM12 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 18zm8.25-6a.75.75 0 010 1.5h-1.5a.75.75 0 010-1.5h1.5zm-13.5 0a.75.75 0 010 1.5H5.25a.75.75 0 010-1.5h1.5zM12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
                </svg>
              )}
            </div>
          </button>

          <div
            className="relative inline-block"
            onMouseEnter={() => sethover(true)}
            onMouseLeave={() => sethover(false)}
          >
            {!login ? (
              <>
                <FaUser
                  onClick={() => navigate("/login")}
                  className={`${
                    darkMode ? "text-white" : "text-black"
                  } text-xl cursor-pointer hover:text-red-500`}
                />
                {hover && (
                  <div className="absolute right-0 mt-3 bg-black text-white text-xs rounded px-2 py-1 z-50">
                    Login / Register
                  </div>
                )}
              </>
            ) : (
              <>
                <FiLogOut
                  onClick={handleLogout}
                  className={`${
                    darkMode ? "text-white" : "text-black"
                  } text-xl cursor-pointer hover:text-red-500`}
                />
                {hover && (
                  <div className="absolute right-0 mt-2 bg-black text-white text-xs rounded px-2 py-1 z-50">
                    Logout
                  </div>
                )}
              </>
            )}
          </div>

          {role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className={`${
                darkMode ? "bg-cyan-200 text-black" : "bg-black text-white"
              } px-4 py-2 rounded-full shadow-md hover:scale-105 hover:bg-opacity-80 transition duration-300`}
            >
              Admin
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {/* Search Bar for Mobile */}
      <div className="flex items-center border rounded overflow-hidden mt-2">
        <input
          type="text"
          placeholder="Search products..."
          className={`flex-grow p-2 text-sm focus:outline-none ${
            darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
          }`}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className="p-2">
          <FaSearch />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden mt-4 space-y-4 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {/* Category Selector in Mobile */}

          <select
            id="category"
            className={`w-full p-2 text-sm mt-2 rounded ${
              darkMode
                ? "bg-gray-700 text-white border border-gray-600"
                : "border border-gray-300"
            }`}
            onChange={(e) => {
              const selectedCategory = e.target.value;
              onCategoryChange(selectedCategory);

              if (selectedCategory === "All") {
                navigate("/");
              } else {
                navigate(
                  `/products/${selectedCategory
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`
                );
              }
            }}
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Icons */}
          <div className="flex gap-1 justify-between">
            <button
              onClick={onToggleDarkMode}
              className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${
                darkMode
                  ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                  : "bg-gradient-to-r from-orange-400 to-pink-500"
              }`}
            >
              <div
                className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                  darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {/* Dynamic SVG for sun/moon icon */}
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21.75 12.003a9.72 9.72 0 01-2.24 6.263 9.729 9.729 0 01-6.26 2.243c-5.389 0-9.75-4.362-9.75-9.75 0-5.387 4.361-9.75 9.75-9.75a9.72 9.72 0 016.26 2.24 9.72 9.72 0 012.24 6.254z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-orange-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 3.75zM12 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 18zm8.25-6a.75.75 0 010 1.5h-1.5a.75.75 0 010-1.5h1.5zm-13.5 0a.75.75 0 010 1.5H5.25a.75.75 0 010-1.5h1.5zM12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z" />
                  </svg>
                )}
              </div>
            </button>
            <div
              className="relative inline-block"
              onMouseEnter={() => sethover(true)}
              onMouseLeave={() => sethover(false)}
            >
              {!login ? (
                <>
                  <FaUser
                    onClick={() => navigate("/login")}
                    className={`${
                      darkMode ? "text-white" : "text-black"
                    } text-xl cursor-pointer hover:text-red-500`}
                  />
                  {hover && (
                    <div className="absolute right-0 mt-3 bg-black text-white text-xs rounded px-2 py-1 z-50">
                      Login / Register
                    </div>
                  )}
                </>
              ) : (
                <>
                  <FiLogOut
                    onClick={handleLogout}
                    className={`${
                      darkMode ? "text-white" : "text-black"
                    } text-xl cursor-pointer hover:text-red-500`}
                  />
                  {hover && (
                    <div className="absolute right-0 mt-2 bg-black text-white text-xs rounded px-2 py-1 z-50">
                      Logout
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            {role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className={`${
                  darkMode ? "bg-cyan-200 text-black" : "bg-black text-white"
                } px-4 py-2 rounded-full shadow-md hover:scale-105 hover:bg-opacity-80 transition duration-300`}
              >
                Admin
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
