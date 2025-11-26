const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Resource = sequelize.define(
  "Resource",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      defaultValue: "General",
    },

    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "resources",
    timestamps: true,
  }
);

module.exports = Resource;
