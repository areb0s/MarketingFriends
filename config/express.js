const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('./passport');
const AirbrakeClient = require('airbrake-js');
const makeErrorHandler = require('airbrake-js/dist/instrumentation/express');

const app = express();

// BODYPARSER SETTING
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
// LOGGER SETTING
app.use(logger('dev'));
// AIRBRAKE SETTING
const airbrake = new AirbrakeClient({
  projectId: 215580,
  projectKey: 'b2abecdbd6f18b37c144c15427bfdbfd',
});
app.use(makeErrorHandler(airbrake));
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
