// models/Team.js
const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const Team = sequelize.define(
  'Team',
  {
    teamId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'teams',
    timestamps: true,
  }
);

module.exports = Team;
