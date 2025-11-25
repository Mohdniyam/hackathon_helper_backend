const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Idea = sequelize.define(
  "Idea",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "General",
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    tableName: "ideas",
    timestamps: true,
  }
);

module.exports = Idea;
