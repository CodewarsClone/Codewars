const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const config = require('./config.js');
const massive = require('massive');
const connectionString = config.connectionString;

const app = module.exports = express();

const massiveInstance = massive.connectSync({connectionString : connectionString});

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(cors());

app.set('db', massiveInstance);

let db = app.get('db');

app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: false,
  resave: false
}));

app.listen(config.port, () => {
  console.log('listening to port', config.port);
});