const express = require("express");
console.log("Inside authRoutes");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Registeration for a new user..
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hash });

  try {
    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Username already exists , Try different username" });
    }
    console.error("❌ Error registering user:", err);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.json({
    token,
    role: user.role, 
    username: user.username, 
  });
});

router.get("/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});
module.exports = router;
