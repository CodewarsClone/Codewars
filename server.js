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

passport.deserializeUser((obj, done) => {
	done(null, obj);
});

passport.use(new GithubStrategy({
	clientID: config.githubId,
	clientSecret: config.githubSecret,
	callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
	db.read.user_by_github_id([profile.id], (err, user) => {
		if (err) {
			console.log(err);
		} else if (user [0]) {
			done(null, user);
		} else {

			console.log('attempting account creation')
			db.create.new_user_from_github([profile.id, profile.displayName, profile._json.email, profile.username, profile._json.avatar_url],

				(err) => {
					if (err) {
						console.log(err);
					}	else {
						db.read.user_by_github_id([profile.id], (err, newUser) => {
							if(err) {
								console.log(err);
							} else {
								done(null, newUser[0])
							}
						});
					}
				})
		}
		
	});


//	return done(null, profile);
}));


const app = module.exports = express();


const massiveInstance = massive.connectSync({connectionString: connectionString});

app.set('db', massiveInstance);
const db = app.get('db');


const testCtrl = require('./controllers/testCtrl');
const kataCtrl = require('./controllers/kataCtrl');


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



app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'user']}));

app.get('/auth/github/callback',
	passport.authenticate('github', {failureRedirect: '/login'}),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect('/#/home');
	});



app.get('/kata', kataCtrl.getKatas);
app.get('/kata/:kataId', kataCtrl.getKatas);
app.get('/kata/completed', kataCtrl.getCompletedKatas);
app.get('/kata/random', kataCtrl.getRandomKata);
app.get('/kata/random/:kyu', kataCtrl.getRandomKata);
app.get('/solutions/:kataId', kataCtrl.getKataSolutions);
app.get('/me', (req, res, next) => {
	return res.status(200).json(req.user);
})

app.post('/test/suite/:kataId', testCtrl.testKata);
app.post('/test/examples', testCtrl.testExamplesKata);
app.post('/solution/:kataId', kataCtrl.postSolution);



app.listen(config.port, function () {
	console.log(`listening on port ${this.address().port}`);
	
	
});