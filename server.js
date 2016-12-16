var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var config = require('./config.js');
var massive = require('massive');
var connectionString = config.connectionString;

var app = module.exports = express();

var massiveInstance = massive.connectSync({connectionString : connectionString});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

app.set('db', massiveInstance);

var db = app.get('db');

app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false
}));

app.listen(config.port, function() {
  console.log('listening to port', config.port);
});