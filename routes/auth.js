const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongodb = require('../data/database');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    const db = mongodb.getDatabase();
    const existing = await db.collection('users').findOne({ username });
    if (existing) return res.status(409).json({ error: 'Username already exists' });

    const hashed = await bcrypt.hash(password, 12);
    const user = { username, password: hashed, email };
    const result = await db.collection('users').insertOne(user);
    res.status(201).json({ id: result.insertedId, username, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login successful', user: req.user });
});

// Logout
router.post('/logout', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logged out' });
  });
});

// Initiate GitHub authentication
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// Handle GitHub callback
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login', session: true }),
  (req, res) => {
    // Successful authentication, redirect or respond as desired
    res.redirect('/'); // or res.json({ message: 'GitHub login successful', user: req.user });
  }
);

module.exports = router;