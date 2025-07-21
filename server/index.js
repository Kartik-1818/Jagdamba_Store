require("dotenv").config(); // This reads from .env file
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(
  cors({
    origin: ["https://jagdamba-store.vercel.app" , "http://localhost:5050" ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

console.log("Loading authRoutes...");
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/subscribe", require("./routes/subscribe"))
console.log("Loading productRoutes...");
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories" , require("./routes/categoryRoutes"))

app.get("/", (req, res) => {
  res.send("✅ Jagdamba Store Backend is running.");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
); 