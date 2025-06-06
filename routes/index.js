const express = require('express');
const passport = require('passport');
const router = express.Router();

const studentsRoutes = require('./students');
const coursesRoutes = require('./courses');

router.use('/students', studentsRoutes);
router.use('/courses', coursesRoutes);

// Root route
router.get('/', (req, res) => {
    if (req.query.message === 'login') {
        res.send('You have successfully logged in!');
    } else if (req.query.message === 'logout') {
        res.send('You have successfully logged out!');
    } else {
        res.send('Welcome to the Students & Courses API!');
    }
});

// GitHub login
router.get('/login', passport.authenticate('github'), (req, res) => {});

// GitHub callback - redirect with login message
router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/?message=login_failed', session: true }),
    (req, res) => {
        res.redirect('/?message=login');
    }
);

// Logout
router.get('/logout', function(req, res, next) {
    if (typeof req.logout === 'function') {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/?message=logout');
        });
    } else {
        res.status(500).send('Logout not available. Check Passport and session setup.');
    }
});

module.exports = router;