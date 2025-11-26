// controllers/teamController.js
const Team = require("../models/Team");
const TeamMember = require("../models/TeamMember");
const { v4: uuid } = require("uuid");

exports.createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    const team = await Team.create({
      teamId: uuid(),
      name,
      createdBy: userId,
    });

    await TeamMember.create({
      teamId: team.teamId,
      userId,
      role: "admin",
    });

    res.json({ message: "Team created", team });
  } catch (error) {
    console.error("Create team error:", error);
    res.status(500).json({ error: "Failed to create team" });
  }
};
