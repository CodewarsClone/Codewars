/**
 * Created by Joshua Baert on 12/15/2016.
 *
 * This Controller is where we take take a script as a string then run our tests against it
 *
 */



function isValidWalk(walk) {
	return walk.length == 10 && !walk.reduce(function (w, step) {
			return w + {"n": -1, "s": 1, "e": 99, "w": -99}[step]
		}, 0)
}

function generateRange(min, max, step) {
	let rtn = [];
	for (let i = min; i <= max; i += step) {
		rtn.push(i)
	}
	return rtn
}

function timeParser(str) {
	str = str.replace(/<COMPLETEDIN::>/, '');
	if (!parseInt(str)) {
		return 0
	} else {
		return parseInt(str)
	}
}

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
				console.log('stdErr');
				console.log(stdErr);
			} else {
				let output = stdOut.split(/\n/g);
				for (let i = output.length - 1; i >= 0; i--) if (output[i] === '') output.splice(i, 1);
				console.log(output);
				
				let res = {
					array: [],
					testCount: 0,
					passedCount: 0
				};
				
				
				for (var i = 0; i < output.length;) {
					if (output[i].search(/<PASSED::>/) > -1) {
						res.testCount++;
						res.passedCount++;
						
						res.array.push({
							type: `test`,
							value: output[i].replace(/<PASSED::>/, ''),
							passed: true
						})
						
					} else if (output[i].search(/<IT::>/) > -1) {
						
						let it = {
							type: `it`,
							value: output[i].replace(/<IT::>/, ''),
							time: null,
							array: []
						};
						
						let recursive = true;
						let j = i + 1;
						while (recursive) {
							if (output[j].search(/<PASSED::>/) > -1) {
								res.testCount++;
								res.passedCount++;
								
								it.array.push({
									type: `test`,
									value: output[j].replace(/<PASSED::>/, ''),
									passed: true
								});
								output.splice(j, 1)
								
							} else if (output[j].search(/<COMPLETEDIN::>/) > -1) {
								it.time = timeParser(output[j]);
								output.splice(j, 1);
								recursive = false
							}
						}
						
						res.array.push(it)
					} else if (output[i].search(/<DESCRIBE::>/) > -1) {
						
						let desc = {
							type: `describe`,
							value: output[i].replace(/<DESCRIBE::>/, ''),
							time: null,
							array: []
						};
						
						let recursive = true;
						let j = i + 1;
						while (recursive) {
							if (output[i].search(/<PASSED::>/) > -1) {
								res.testCount++;
								res.passedCount++;
								
								desc.array.push({
									type: `test`,
									value: output[i].replace(/<PASSED::>/, ''),
									passed: true
								})
								
							} else if (output[i].search(/<IT::>/) > -1) {
								
								let it = {
									type: `it`,
									value: output[i].replace(/<IT::>/, ''),
									time: null,
									array: []
								};
								
								let rec = true;
								let n = i + 1;
								while (recursive) {
									if (output[n].search(/<PASSED::>/) > -1) {
										res.testCount++;
										res.passedCount++;
										
										it.array.push({
											type: `test`,
											value: output[n].replace(/<PASSED::>/, ''),
											passed: true
										});
										output.splice(n, 1)
										
									} else if (output[n].search(/<COMPLETEDIN::>/) > -1) {
										it.time = timeParser(output[n]);
										output.splice(n, 1);
										rec = false
									}
								}
								
								desc.array.push(it)
								
							} else if (output[j].search(/<COMPLETEDIN::>/) > -1) {
								desc.time = timeParser(output[j]);
								output.splice(j, 1);
								recursive = false
							}
							
							res.array.push(desc)
						}
						
						console.log(output[i])
					}
					
					
					
					i++;
				}
				
				console.log(res)
			}
			
			
		}
	)
	;
	
	
	return defer.promise
}



module.exports = {
	testKata: (req, res, next) => {
		
		let body = req.body;
		
		db.read.kata_for_test([req.params.kataid], (err, kataArray) => {
			if (err) console.log(err);
			let test = kataArray[0].test_script[0].test;
			
			testRunner(body.script, test).then((response) => {
				console.log(response);
				res.json(response)
			});
			res.sendStatus(200);
		});
		
		
	},
	
	testExamplesKata: (req, res, next) => {
		let body = req.body;
//		console.log(body);
		
		testRunner(body.script, body.examples).then((response) => {
			console.log(response);
			res.sendStatus(200);
		});
		
		res.json(exampleRes)
	}
};

	
	
	
	
	
	