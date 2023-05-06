var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

/* GET home page. */
const TOKEN_SECRET = process.env.SECRET;
router.get('/auth/google',
 passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback',
 passport.authenticate('google', { failureRedirect: '/error' }),
 function(req, res) {
   const token = jwt.sign({ id: req.user.sub, name: req.user.name }, TOKEN_SECRET, {
     expiresIn: 60 * 60,
   });
   res.cookie('auth', token, { httpOnly: true });
   res.redirect("http://localhost:8050/");
});
module.exports = router;
