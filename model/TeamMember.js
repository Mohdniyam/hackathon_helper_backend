// models/TeamMember.js
const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const TeamMember = sequelize.define(
  'TeamMember',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("admin", "member"),
      defaultValue: "member",
    },
  },
  {
    tableName: "team_members",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['teamId', 'userId'], // prevent duplicate membership
      },
    ],
  }
);

module.exports = TeamMember;
