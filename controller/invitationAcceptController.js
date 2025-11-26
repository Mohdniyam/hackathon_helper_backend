// controllers/invitationAcceptController.js
const TeamInvitation = require("../models/TeamInvitation");
const TeamMember = require("../models/TeamMember");

exports.acceptInvitation = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user.userId;

    const invite = await TeamInvitation.findOne({
      where: { inviteToken: token, status: "pending" },
    });

    if (!invite)
      return res.status(400).json({ error: "Invalid or expired invitation" });

    // Add user to team
    await TeamMember.findOrCreate({
      where: {
        teamId: invite.teamId,
        userId,
      },
      defaults: { role: "member" },
    });

    // Mark invitation as accepted
    invite.status = "accepted";
    await invite.save();

    res.json({ message: "Invitation accepted successfully" });
  } catch (error) {
    console.error("Accept invite error:", error);
    res.status(500).json({ error: "Failed to accept invite" });
  }
};
