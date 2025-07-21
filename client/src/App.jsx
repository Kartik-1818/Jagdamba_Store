import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Homepage";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./components/AdminDashboard";
import { useState , useEffect} from "react";
import CategoriesPage from "./components/Category";
import ProductByCategory from "./components/ProductByCategory";

function App() {
  const [darkMode, setDarkmode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "Dark") {
      setDarkmode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarktheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkmode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"}`}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/categories" element = {<CategoriesPage/>} />
        <Route path="/products/:categoryName" element = {<ProductByCategory darkMode={darkMode}/>} />
        <Route
          path="/"
          element={
            <HomePage
              onToggleDarkMode={toggleDarktheme}
              darkMode={darkMode}
            />
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
