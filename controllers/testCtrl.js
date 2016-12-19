/**
 * Created by Joshua Baert on 12/15/2016.
 *
 * This Controller is where we take take a script as a string then run our tests against it
 *
 */

// This is where wer run a script.. I have verified that so long as we get it in string format we run unit tests

/*exec(`docker run --rm codewars/node-runner run -l javascript -c "${script}" -t cw -f "${test}"`,
 (err, stdout, stderr) => {
 if (err) console.log('err', err);
 console.log(typeof stdout);
 console.log('stdout', stdout);
 console.log('stderr', stderr);
 });*/

const app = require('../server');

const db = app.get('db');

const exec = require('child_process').exec;

let test = `Test.assertEquals(addTwo(2), 4)`;

module.exports = {
	testScript: (req, res, next) => {
		console.log('body');
		console.log(req.body);
		console.log('params', req.params);
		
		let body = req.body;
		
		
		db.read.kata_by_id([req.params.kataId], (err, kataArray)=>{
			if(err) console.log(err);
			let kata = kataArray[0];
			
			exec(`docker run --rm codewars/node-runner run -l javascript -c "${body.script}" -t cw -f "${kata.test}"`,
				(err, stdout, stderr) => {
					if (err) {
						console.log('err', err);
					} else if (stdout) {
						res.json(stdout);
					} else if (stderr) {
						res.json(stderr);
					}
					return
				});
		});
		
		
		
	},
	
	testKata: (req, res, next) => {
		
	},
	
	testExamplesKata: (req, res, next) => {
		
	},
	
};
