import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import makers from "../assets/image2.jpeg";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Footer({ darkMode }) {
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required!");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Invalid email format!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5050/api/subscribe", {
        email,
      });

      if (res.status === 200) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Subscription failed.");
    }
  };

  return (
    <footer className={`px-4 md:px-8 py-12 border-t ${darkMode ? 'bg-gray-900 text-gray-300 border-gray-700' : 'bg-neutral-100 text-gray-800 border-gray-200'}`}>
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
          {/* THE MAKERS */}
          <div className="flex flex-col items-center space-y-3 text-center">
            <h3 className="text-lg font-bold">THE MAKERS</h3>
            <img
              src={makers}
              alt="owners"
              className="h-50 w-50 rounded-full object-cover shadow-lg"
            />
            <p className="text-sm font-medium">PAWAN JHAMB</p>
            <p className="text-sm font-medium">JYOTI</p>
          </div>

          {/* ABOUT US */}
          <div className="text-left space-y-4">
            <h3 className="text-lg font-bold">ABOUT US</h3>
            <p className="text-sm leading-relaxed">
              Established in 2000, our shop has proudly served government
              schools and institutions for over two decades. We offer everything
              a school needs—from stationery and furniture to lab tools and
              teaching aids—tailored to meet educational standards. Trusted for
              quality and timely delivery. <br /> Our mission is simple: To
              empower education by providing the right tools - because when
              schools grow, our future grows.
            </p>
          </div>

          {/* CONNECT WITH US */}
          <div className="flex flex-col items-center space-y-5 text-center">
            <h3 className="text-lg font-bold">CONNECT WITH US</h3>
            <div className="flex justify-center space-x-4 text-xl">
              <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <a
                href="mailto:youremail@example.com"
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://wa.me/9414240629"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-500"
              >
                <FaWhatsapp />
              </a>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center gap-3 px-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`px-4 py-2 w-full sm:w-64 rounded-md border focus:outline-none focus:ring-2 ${
                  darkMode
                    ? 'bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-400 focus:ring-gray-400'
                    : 'bg-white text-gray-800 border-gray-300 placeholder-gray-500 focus:ring-gray-400'
                }`}
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md flex items-center gap-2 text-sm"
              >
                <FaEnvelope />
                <span>Subscribe</span>
              </button>
            </form>
          </div>

          {/* CONTACT US */}
          <div className="text-left space-y-4">
            <h3 className="text-lg font-bold">CONTACT US</h3>
            <div className="flex items-center gap-2 text-sm">
              <FaPhoneAlt className="text-red-500" />
              <span>+91-9414240629</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <FaMapMarkerAlt className="text-red-500 mt-1" />
              <span>
                Jagdamba Store, In Front of Diamond Hospital,
                <br />Aerodrum Road , Alwar Rajasthan - 301001
              </span>
            </div>
            <div>
              <iframe
                title="Shop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14146.848758248072!2d76.6056616078125!3d27.571441400000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397299ec7427939d%3A0x1989f59a59689373!2z4KSc4KSX4KSm4KSu4KWN4KSs4KS-IOCkuOCljeCkn-Cli-CksA!5e0!3m2!1sen!2sin!4v1752073082350!5m2!1sen!2sin"
                width="600"
                height="450"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-40 rounded-md border-none transform hover:scale-104 transition duration-200"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t pt-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">
              JAGDAMBA STORE
            </span>{" "}
            — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
