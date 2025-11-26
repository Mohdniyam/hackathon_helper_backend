const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./config/database.js");
const cors = require("cors");
const firebaseRoute = require("./routes/firebaseRoute.js");
const userRoute = require("./routes/userRoute.js");
const teamRoute = require("./routes/teamRoute.js");

// Load environment variables
dotenv.config();

const app = express();

// ✅ Always load middleware before routes
app.use(cors());
app.use(express.json());

// ✅ Simple health check route
app.get("/", (req, res) => {
  res.send("🚀 Hackathon Helper Backend Running");
});

// ✅ Mount Firebase routes
app.use("/api/firebase", firebaseRoute);
// ✅ Mount User routes
app.use("/api/user", userRoute);

// ✅ Mount Team routes
app.use("/api/team", teamRoute);

// ✅ Database connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Error connecting to database:", err));

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
