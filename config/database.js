const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// 👀 Log minimal info for debugging (optional)
console.log("📦 Connecting to:", process.env.DB_HOST || "Using DATABASE_URL");

// 🧩 Create Sequelize instance (auto-detect connection mode)
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // needed for Render SSL
        },
      },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      }
    );

// 🧪 Test database connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

module.exports = { sequelize };
