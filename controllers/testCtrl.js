/**
 * Created by Joshua Baert on 12/15/2016.
 *
 * This Controller is where we take take a script as a string then run our tests against it
 *
 */


const app = require('../server');
const db = app.get('db');
const q = require('q');
const exec = require('child_process').exec;


module.exports = {
	testKata: (req, res, next) => {
		console.log('hit testCtrl');
		
		let body = req.body;
		
		
		db.read.kata_by_id([req.params.kataId], (err, kataArray)=>{
			if(err) console.log(err);
			let kata = kataArray[0];
			
			let promiseArray = [];
			
			
			kata.test_script.forEach((ele, i) =>{
				
				
				
				
				console.log(ele.test);
				exec(`docker run --rm codewars/node-runner run -l javascript -c "${body.script}" -t cw -f "${ele.test}"`,
					(err, stdOut, stdErr) => {
						if (err) {
							console.log(err)
						} else if (stdOut) {
							ele.result = stdOut;
						} else if (stdErr) {
							ele.result = stdOut;
						}
					});
				
				
				
				
				
			});
			res.json(kata.test_script)
			
		});
		
		
	},
	
	testExamplesKata: (req, res, next) => {
		
	},
	
};
