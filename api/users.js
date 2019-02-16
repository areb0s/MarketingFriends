const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: false,
  }),
);

router.post('/logout', (req, res) => {
  req.logout();
  req.session.save(() => {
    res.redirect('/');
  });
});

router.post('/fatch', (req, res) => {
  if (req.user) {
    const userInfo = {
      userID: req.user.userID,
      userAKA: req.user.userAKA,
      admin: req.user.admin,
    };
    res.json(userInfo);
  }
});

module.exports = router;
