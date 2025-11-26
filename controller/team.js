const { Team, TeamMember, TeamInvitation,  } = require("../models");
const { v4: uuid } = require("uuid");

const { teamInvitationEmail } = require("../utils/sendEmail.js");

exports.teamInvitationEmailFunc = async (req, res) => {
  try {
    const { to, teamName, inviteLink, from } = req.body;

    console.log("Invitation Email Data:", { to, teamName, inviteLink, from });

    const result = await teamInvitationEmail(to, teamName, inviteLink, from);

    if (result.success) {
      res.status(200).json({ message: 'Invitation email sent successfully', messageId: result.messageId });
    } else {
      res.status(500).json({ error: result.error, message: result.message });
    }
  } catch (err) {
    console.error("🔥 REAL ERROR:", err);   // ← IMPORTANT
    return res.status(500).json({ error: err.message });
  }
};

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