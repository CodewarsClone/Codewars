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
			done(null, user[0]);
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


app.use(express.static(__dirname + '/src'));
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

app.get('/api/check-auth', kataCtrl.checkAuth);

app.get('/api/me', kataCtrl.getUser);
app.get('/api/kata/:kataid', kataCtrl.getKatasByKataId);
app.get('/api/random-kata/:userkyu', kataCtrl.getRandomKata);
app.get('/api/random-kata-list/:userkyu', kataCtrl.getRandomKataList);
app.get('/api/katas-by-kyu/:kyu', kataCtrl.getKatasByKyu);
app.get('/api/solutions/:kataid', kataCtrl.getKataSolutions);
app.get('/api/get-user-katas/:userid', kataCtrl.getUserKatas);

app.post('/api/test/suite/:kataid', testCtrl.testKata);
app.post('/api/test/examples', testCtrl.testExamplesKata);
app.post('/api/submit-answer/:kataid', kataCtrl.sumbitAnswer);
app.post('/api/kata-by-name', kataCtrl.searchByKatasName);
app.post('/api/kata-votes', kataCtrl.voteKata);
app.post('/api/solution-votes', kataCtrl.voteSolution);

app.put('/api/points', kataCtrl.addPointsToUser);

app.listen(config.port, function () {
	console.log(`listening on port ${this.address().port}`);
});