/**
 * Created by Joshua Baert on 12/15/2016.
 *
 * This Controller is where we take take a script as a string then run our tests against it
 *
 */


let test = {
	type: `test`,
	value: `Test Passed: Value == 'Some Value'`,
	passed: true
};
let it = {
	type: `it`,
	value: `Fixed tests or random tests`,
	time: 2, //Milliseconds
	array: [test]
};
let describe = {
	type: `describe`,
	value: `Tests of something`,
	time: 2, //Milliseconds
	array: [it]
};
let main = {
	array: [describe],
	testCount: 1,
	passedCount: 1
};





let exampleRes = {
	array: [
		describe,
		it,
		test,
		{
			type: `test`,
			value: `Test Passed: Value == 'Some Value'`,
			passed: false
		},
		
	],
	testCount: 4,
	passedcount: 3
};

const app = require('../server');
const db = app.get('db');
const Q = require('q');
const exec = require('child_process').exec;



function testRunner(script, test) {
	let defer = Q.defer();
	
	exec(`docker run --rm codewars/node-runner run -l javascript -c "${script}" -t cw -f "${test}"`,
		(err, stdOut, stdErr) => {
			if (err) console.log(err);
			if (stdErr) {
				console.log(stdErr);
				defer.resolve(stdErr);
			} else {
				console.log(stdOut)
				
			}
			
			
		});
	
	
	return defer.promise
}



module.exports = {
	testKata: (req, res, next) => {
		
		let body = req.body;
		
		db.read.kata_for_test([req.params.kataId], (err, kataArray) => {
			if (err) console.log(err);
			let kata = kataArray[0];
			let promiseArr = [];
			
			kata.test_script.forEach((ele, i) => {
				
				let deffered = Q.defer();
				exec(`docker run --rm codewars/node-runner run -l javascript -c "${body.script}" -t cw -f "${ele.test}"`,
					(err, stdOut, stdErr) => {
						if (err) {
							console.log(err);
						} else if (stdOut) {
							if (stdOut.search(/passed/gi) > 0) {
								ele.passed = true
							} else {
								ele.passed = false;
							}
							ele.result = stdOut.replace(/</g, '\n<');
							deffered.resolve(stdOut);
						} else if (stdErr) {
							console.log(stdErr);
							ele.result = stdErr;
							deffered.resolve(stdErr);
						}
					});
				promiseArr.push(deffered.promise)
			});
			
			
			Q.all(promiseArr).then((response) => {
				res.json(kata.test_script);
			})
		});
		
		
	},
	
	testExamplesKata: (req, res, next) => {
		let body = req.body;
		console.log(body.script);
		
		
		console.log(exampleRes);
		res.json(exampleRes)
	}
};

	
	
	
	
	
	