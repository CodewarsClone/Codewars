const app = require('../server');
const db = app.get('db');
const testCtrl = require('./testCtrl');

module.exports = {
    testScript: (req, res, next) => {
        let script = req.body;
        console.log(script);
        let results = testCtrl.firstTest(script);
        console.log(results);
        res.json(results);
     }
}
