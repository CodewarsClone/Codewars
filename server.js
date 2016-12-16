const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const config = require('./config.js');
const massive = require('massive');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const connectionString = config.connectionString;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done)  => {
  done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: config.githubId,
  clientSecret: config.githubSecret,
  callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  // code goes here
    // go to database and look for profile.id
    // create user using profile.id
    return done(null/*error*/, profile/*info that goes on session*/);
}));

const app = module.exports = express();

const massiveInstance = massive.connectSync({connectionString : connectionString});

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('db', massiveInstance);
const db = app.get('db');
const endPointCtrl = require('./controllers/endPointCtrl');

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.post('/solution', endPointCtrl.testScript);


app.listen(config.port, function() {
  console.log(`listening on port ${this.address().port}`);
});