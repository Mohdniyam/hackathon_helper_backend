const express = require("express");

const { SignUp, getAllUsers } = require("../controller/user.js");


const router = express.Router();

router.post("/signup", SignUp);
router.get("/all", getAllUsers);

module.exports = router;