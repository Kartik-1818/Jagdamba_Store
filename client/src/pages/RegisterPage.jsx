import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://jagdamba-store.onrender.com/api/auth/register",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Username already exists");
      } else {
        alert("Registration failed , Try again");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left side */}
        <div className="md:w-1/2 bg-yellow-400 p-8 md:p-12 flex flex-col justify-center items-center text-white space-y-6">
          <h2 className="text-3xl font-bold">Join Us!</h2>
          <p className="text-center">
            Create your account to shop with <strong>JAGDAMABA STORE</strong> —
            Your One-Stop Stationery Store!
          </p>
        </div>

        {/* Right side */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Register</h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter your details to create a new account.
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="relative">
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border text-neutral-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border text-neutral-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-semibold text-white rounded bg-yellow-400 hover:bg-yellow-500 transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
