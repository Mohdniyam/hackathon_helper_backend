const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./config/database.js");
const cors = require("cors");
const firebaseRoute = require("./routes/firebaseRoute.js");
const Idea = require("./model/idea");
const ideasRoute = require("./routes/ideasRoute");
const categoryRoute = require("./routes/categoryRoute");
const resourceRoutes = require("./routes/resourceRoutes");

// Load environment variables
dotenv.config();

const app = express();

// ✅ Always load middleware before routes
app.use(cors());
app.use(express.json());

sequelize
  .sync({ alter: true })
  .then(() => console.log("🟢 Tables synced successfully"))
  .catch((err) => console.error("🔴 Sync error:", err));

// ✅ Simple health check route
app.get("/", (req, res) => {
  res.send("🚀 Hackathon Helper Backend Running");
});

app.use("/api/ideas", ideasRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/resources", resourceRoutes);
// ✅ Mount Firebase routes
app.use("/api/firebase", firebaseRoute);

// ✅ Database connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Error connecting to database:", err));

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
