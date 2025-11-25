const express = require("express");
const Category = require("../model/category");

const router = express.Router();

// Add Category
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get All Categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});




module.exports = router;
