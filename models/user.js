const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String },
  displayName: { type: String },
  profileUrl: { type: String },
  email: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;