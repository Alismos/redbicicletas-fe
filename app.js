const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const indexRouter = require('./routes/index');
const app = express();
const session = require('express-session');
require('dotenv').config()
// This is here for our client side to be able to talk to our server side. you may want to be less permissive in production and define specific domains.
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
passport.serializeUser(function(user, cb) {
 cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
 cb(null, obj);
});
passport.use(new GoogleStrategy({
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_SECRET,
   callbackURL: `http://localhost:${process.env.FRONTEND_PORT}/auth/google/callback`
 },
 function(accessToken, refreshToken, profile, done) {
   // here you can create a user in the database if you want to
   return done(null, profile);
 }
));
module.exports = app;