// models/TeamInvitation.js
const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const TeamInvitation = sequelize.define(
  'TeamInvitation',
  {
    invitationId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    invitedEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },

    inviteToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    invitedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("pending", "accepted", "expired"),
      defaultValue: "pending",
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "team_invitations",
    timestamps: true,
  }
);

module.exports = TeamInvitation;
