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
		console.log('hit testCtrl');
		
		let body = req.body;
		console.log(body);
		
		db.read.kata_by_id([req.params.kataId], (err, kataArray)=>{
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
							deffered.resolve(stdOut);
							ele.result = stdOut;
						} else if (stdErr) {
							deffered.resolve(stdErr);
							ele.result = stdErr;
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
			let deffered = Q.defer();
			
			exec(`docker run --rm codewars/node-runner run -l javascript -c "${body.script}" -t cw -f "${ele.test}"`,
				(err, stdOut, stdErr) => {
					if (err) {
						console.log(err);
					} else if (stdOut) {
						deffered.resolve(stdOut);
						ele.result = stdOut;
					} else if (stdErr) {
						deffered.resolve(stdErr);
						ele.result = stdErr;
					}
				});
			
			promiseArr.push(deffered.promise)
		});
		
		Q.all(promiseArr).then(response => {
			console.log(body.examples);
			res.json(body.examples);
		})
		
	},
	
};
