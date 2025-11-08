const express = require("express");
const { verifyFirebaseToken } = require("../middleware/auth.js");

const router = express.Router();

router.get("/protected", verifyFirebaseToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}`, user: req.user });
});

module.exports = router;
