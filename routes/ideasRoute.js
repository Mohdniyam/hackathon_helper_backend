const express = require("express");
const Idea = require("../model/idea");

const router = express.Router();

// Create Idea (POST)
router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const idea = await Idea.create({ title, description, category });
    
    res.status(201).json({ success: true, data: idea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all Ideas (GET)
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.findAll({ order: [["createdAt", "DESC"]] });

    res.json({ success: true, data: ideas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Idea (DELETE /:id)
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Idea.destroy({ where: { id } });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Idea not found" });
    }

    res.json({ success: true, message: "Idea deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }

  // Like Idea (PATCH /:id/like)
});

router.patch("/:id/like", async (req, res) => {
  try {
    const id = req.params.id;

    const idea = await Idea.findByPk(id);
    if (!idea)
      return res
        .status(404)
        .json({ success: false, message: "Idea not found" });

    idea.likes = (idea.likes || 0) + 1;
    await idea.save();

    res.json({ success: true, likes: idea.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
