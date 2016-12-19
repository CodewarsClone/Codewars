const app = require('../server');
const db = app.get('db');
const testCtrl = require('./testCtrl');

const exec = require('child_process').exec;

let test = `Test.assertEquals(addTwo(2), 4)`;

module.exports = {
	testScript: (req, res, next) => {
		let script = req.body.script;
		
		exec(`docker run --rm codewars/node-runner run -l javascript -c "${script}" -t cw -f "${test}"`,
			(err, stdout, stderr) => {
				if (err) {
					console.log('err', err);
				} else if (stdout) {
					console.log('after stdOut');
					console.log(typeof stdout);
					res.json(stdout);
				} else if (stderr) {
					res.json(stderr);
				}
				return
			});
		
	},
};
