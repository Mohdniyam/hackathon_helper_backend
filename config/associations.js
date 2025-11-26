const { User, Team, TeamMember, TeamInvitation } = require("../model");


// 1️⃣ Team belongs to user (creator)
Team.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

// 2️⃣ Many-to-Many relation
User.belongsToMany(Team, { through: TeamMember, foreignKey: "userId" });
Team.belongsToMany(User, { through: TeamMember, foreignKey: "teamId" });

// 3️⃣ Team has invitations
Team.hasMany(TeamInvitation, { foreignKey: "teamId" });
TeamInvitation.belongsTo(Team, { foreignKey: "teamId" });

// 4️⃣ User sends invitations
User.hasMany(TeamInvitation, { foreignKey: "invitedBy" });
TeamInvitation.belongsTo(User, { foreignKey: "invitedBy" });
