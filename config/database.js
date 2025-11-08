const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, process.env.DB_HOST, process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost", // ✅ correct
    port: process.env.DB_PORT || 5432,        // ✅ separate field for port
    dialect: "postgres",
    logging: false,
  }
);

module.exports = { sequelize };
