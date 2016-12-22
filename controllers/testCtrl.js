/**
 * Created by Joshua Baert on 12/15/2016.
 *
 * This Controller is where we take take a script as a string then run our tests against it
 *
 */


const app = require('../server');
const db = app.get('db');
const Q = require('q');
const exec = require('child_process').exec;


module.exports = {
	testKata: (req, res, next) => {
		
		let body = req.body;
		
		db.read.kata_for_test([req.params.kataId], (err, kataArray)=>{
			if(err) console.log(err);
			let kata = kataArray[0];
			let promiseArr = [];
			
			kata.test_script.forEach((ele, i) =>{
				
				let deffered = Q.defer();
				exec(`docker run --rm codewars/node-runner run -l javascript -c "${body.script}" -t cw -f "${ele.test}"`,
					(err, stdOut, stdErr) => {
						if (err) {
							console.log(err);
						} else if (stdOut) {
							console.log(stdOut.search(/passed/gi));
							if (stdOut.search(/passed/gi) > 0) {
								ele.passed = true
							} else {
								ele.passed = false;
							}
							ele.result = stdOut;
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
		let promiseArr = [];
		console.log(body.script);
		
		body.examples.forEach((ele, i) => {
			//Make sure that test is not empty
			if (ele.test) {
				let deffered = Q.defer();
				
				exec(`docker run --rm codewars/node-runner run -l javascript -c "${body.script}" -t cw -f "${ele.test}"`,
					(err, stdOut, stdErr) => {
						if (err) {
							console.log(err);
						} else if (stdOut) {
							console.log(stdOut.search(/passed/gi));
							if (stdOut.search(/passed/gi) > 0) {
								ele.passed = true
							} else {
								ele.passed = false;
							}
							ele.result = stdOut;
							deffered.resolve(stdOut);
						} else if (stdErr) {
							console.log(stdErr);
							ele.result = stdErr;
							deffered.resolve(stdErr);
						}
					});
				
				promiseArr.push(deffered.promise)
			} else {
				return
			}
			
		});
		
		Q.all(promiseArr).then(response => {
			console.log(body.examples);
			res.json(body.examples);
		})
		
	},
	
};
