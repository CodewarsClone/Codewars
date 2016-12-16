const app = require('../server');
const db = app.get('db');
const testCtrl = require('./testCtrl');

module.exports = {
    testScript: (req, res, next) => {
        testCtrl.firstTest(script, , (err, user) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(user);
        })
    }
}