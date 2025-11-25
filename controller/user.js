const  { User }  = require('../model')
const bcrypt = require('bcrypt');

exports.SignUp = async (req, res) => {
try {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedToken = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedToken,
    role,
  });

  res.status(201).json({ message: 'User created successfully', userId: user.userId });

} catch (err) {
  console.error("🔥 REAL ERROR:", err);   // ← IMPORTANT
  return res.status(500).json({ error: err.message });
}
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error("🔥 REAL ERROR:", err);   // ← IMPORTANT
    return res.status(500).json({ error: err.message });
  }
};