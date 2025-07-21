import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://jagdamba-store.onrender.com/api/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/")
      toast.success("login successful");
    } catch (err) {
      alert("Invalid Details");
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side */}
          <div className="md:w-1/2 bg-yellow-400 p-8 md:p-12 flex flex-col justify-center items-center text-white space-y-6">
            <h2 className="text-5xl font-bold">Welcome</h2>
            <p className="text-center">
              Welcome to <strong>JAGDAMBA STORE</strong> — Your One-Stop Stationery Store!
            </p>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Log in</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter your credentials to access your account.
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border text-gray-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border text-gray-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

              <div className="text-right text-sm">
                <button
                  type="button"
                  className="text-blue-500 hover:underline"
                  onClick={() => alert("Forgot password flow coming soon!")}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 font-semibold text-white rounded bg-yellow-400 hover:bg-yellow-500 transition ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "LOG IN"}
              </button>
            </form>

            <p className="mt-6 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-yellow-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
  </>
);
}
export default LoginPage;