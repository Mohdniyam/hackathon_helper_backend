const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("user", "organizer"),
      defaultValue: "user",
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    defaultScope: {
      order: [['createdAt', 'DESC']],
    },
  }
);

module.exports = User;
