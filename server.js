var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var config = require('./config.js');
var massive = require('massive');
var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var connectionString = config.connectionString;

passport.serializeUse((user, done) => {
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

var app = module.exports = express();

var massiveInstance = massive.connectSync({connectionString : connectionString});

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
var db = app.get('db');
var userCtrl = require('./controllers/userCtrl');

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {
	successRedirect: '/me',
	failureRedirect: '/login'
}), (req, res) => {
	console.log(req.session);
});




app.listen(config.port, () => {
  console.log('listening to port', config.port);
});