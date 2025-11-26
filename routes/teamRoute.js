const express = require("express");

const { teamInvitationEmailFunc } = require("../controller/team.js");

const router = express.Router();

router.post("/invite", teamInvitationEmailFunc);

module.exports = router;


// routes/teamRoutes.js
const express = require("express");
const {
  createTeam,
} = require("../controllers/teamController");
const {
  inviteUser,
} = require("../controllers/inviteController");
const {
  acceptInvitation,
} = require("../controllers/invitationAcceptController");

const router = express.Router();
const auth = require("../middleware/auth");

// Team actions
router.post("/create", auth, createTeam);

// Invite
router.post("/invite", auth, inviteUser);

// Accept invitation
router.post("/accept-invite", auth, acceptInvitation);

module.exports = router;
