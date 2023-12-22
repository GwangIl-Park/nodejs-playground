const express = require('express');
const passport = require('passport');
const sendMail = require('../mail/mail');
const User = require('../models/users.model');
const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.json({ msg: info });
        }

        req.logIn(user, function (err) {
            if (err) { return next(err); }
            res.redirect('/posts');
        })
    })(req, res, next)
})

router.post('/logout', (req, res, next) => {
    req.logOut(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    })
})

router.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
    }
})

router.get('/google', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/posts',
    failureRedirect: '/login'
}));

module.exports = router;