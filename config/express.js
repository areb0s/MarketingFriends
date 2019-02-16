const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('./passport');

const app = express();

// BODYPARSER SETTING
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
// SESSION SETTING
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 3,
    },
  }),
);
// PASSPORT SETTING
app.use(passport.initialize());
app.use(passport.session());
// STATIC SETTING
app.use(express.static(path.join(__dirname, '../build')));

module.exports = app;
