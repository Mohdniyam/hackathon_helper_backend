const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

console.log("📦 Connecting to:", process.env.DB_HOST || "Using DATABASE_URL");

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
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

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

sequelize
  .sync({ alter: true }) // 👈 ADD THIS
  .then(() => console.log("📌 All models synced successfully"))
  .catch((err) => console.error("❌ Sync error:", err));

module.exports = { sequelize };
