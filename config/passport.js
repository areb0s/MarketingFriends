const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.userID);
});
passport.deserializeUser((id, done) => {
  User.findOne({ userID: id }, (err, user) => {
    if (err) {
      console.log(err);
    }
    done(null, user);
  });
});
passport.use(
  new LocalStrategy(
    {
      usernameField: 'userID',
      passwordField: 'userPW',
    },
    (username, password, done) => {
      User.findOne({ userID: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user.userPW === password) {
          return done(null, user);
        }
        return done(null, false);
      });
    },
  ),
);
module.exports = passport;
