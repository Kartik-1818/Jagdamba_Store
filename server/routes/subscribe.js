const express = require("express");
const router = express.Router();
const Subscribers = require("../models/subscribe");

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const existing = await Subscribers.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    await Subscribers.create({ email });
    return res.status(200).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error("Error subscribing:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/" , async (req,res) => {
  const subs = await Subscribers.find().sort({createdAt : -1})
  res.status(200).json(subs)
});
module.exports = router;
