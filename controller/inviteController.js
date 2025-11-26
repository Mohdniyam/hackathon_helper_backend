// controllers/inviteController.js
const TeamInvitation = require("../models/TeamInvitation");
const { v4: uuid } = require("uuid");
const sendEmail = require("../utils/sendEmail"); // your email utility

exports.inviteUser = async (req, res) => {
  try {
    const { email, teamId } = req.body;
    const invitedBy = req.user.userId;

    const inviteToken = uuid();
    const inviteLink = `http://localhost:5173/accept-invite?token=${inviteToken}`;

    await TeamInvitation.create({
      invitationId: uuid(),
      invitedEmail: email,
      teamId,
      inviteToken,
      invitedBy,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    await sendEmail({
      to: email,
      subject: "Team Invitation",
      html: `<p>You are invited to join a team.</p>
             <a href="${inviteLink}">Click to accept invitation</a>`
    });

    res.json({
      message: "Invitation sent",
      inviteLink,
    });
  } catch (error) {
    console.error("Invite user error:", error);
    res.status(500).json({ error: "Failed to send invite" });
  }
};

