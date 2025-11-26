const express = require("express");
const Resource = require("../model/resource");
const router = express.Router();

/* --------------------------
   CREATE RESOURCE (POST)
--------------------------- */
router.post("/", async (req, res) => {
  try {
    const { name, description, url, category, rating } = req.body;

    const resource = await Resource.create({
      name,
      description,
      url,
      category,
      rating: rating || 0,
    });

    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/* --------------------------
   GET ALL RESOURCES
--------------------------- */
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/* --------------------------
   DELETE RESOURCE
--------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Resource.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.json({ success: true, message: "Resource deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/* --------------------------
   UPDATE RATING (PATCH)
--------------------------- */
router.patch("/:id/rate", async (req, res) => {
  try {
    const id = req.params.id;
    const { rating } = req.body;

    const resource = await Resource.findByPk(id);
    if (!resource)
      return res
        .status(404)
        .json({ success: false, message: "Resource not found" });

    resource.rating = rating;
    await resource.save();

    const resources = await Resource.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: resources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
