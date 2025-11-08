var admin = require("firebase-admin");
const path = require("path");

// full path to serviceAccountKey.json
const fullPath = path.join(__dirname, "../serviceAccountKey.json");
console.log(fullPath);

var serviceAccount = require(fullPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;

