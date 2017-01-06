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
const util = require('util');



function timeParser(str) {
	str = str.replace(/<COMPLETEDIN::>/, '');
	if (!parseInt(str)) {
		return 1
	} else {
		return parseInt(str)
	}
}



function objectifer(arr) {
	return arr.map((ele, i) => {
		if (ele.search(/<DESCRIBE::>/) > -1) {
			return {
				type: `describe`,
				value: ele.replace(/<DESCRIBE::>/, ''),
				time: null,
				nest: []
			}
			
		} else if (ele.search(/<IT::>/) > -1) {
			return {
				type: `it`,
				value: ele.replace(/<IT::>/, ''),
				time: null,
				nest: []
			}
			
		} else if (ele.search(/<PASSED::>/) > -1) {
			return {
				type: 'test',
				passed: true,
				value: ele.replace(/<PASSED::>/, ''),
			}
		} else if (ele.search(/<FAILED::>/) > -1) {
			return {
				type: 'test',
				passed: false,
				value: ele.replace(/<FAILED::>/, ''),
			}
			
		} else if (ele.search(/<COMPLETEDIN::>/) > -1) {
			return {type: 'completed', time: timeParser(ele)}
		}
	});
}



function nester(array) {
	let testCount = 0;
	let passCount = 0;
	for (let i = array.length - 1; i >= 0; i--) {
		if (array[i]) {
			if (array[i].type == 'test') {
				testCount += 1;
				if (array[i].passed == true) passCount += 1
			}
			if (array[i].type === 'describe' || array[i].type === 'it') {
				let j = i + 1;
				let recurs = true;
				while (recurs) {
					if (array[j].type !== 'completed') {
						array[i].nest.push(array.splice(j, 1)[0])
					} else {
						array[i].time = array[j].time;
						array.splice(j, 1);
						recurs = false
					}
				}
			}
		}
	}
	return {
		nest: array,
		testCount: testCount,
		passCount: passCount
	}
}



function testRunner(script, test) {
	let defer = Q.defer();
	
	exec(`docker run --rm codewars/node-runner run -l javascript -c "${script}" -t cw -f "${test}"`,
		(err, stdOut, stdErr) => {
			if (err) console.log(err);
			
			if (stdErr && !stdOut) {
					stdErr = stdErr.replace(/\n/g , '\\n')
					.replace(/\s/g, '\\s');
				return defer.resolve(stdErr);
			} else {
				if (stdOut.search(/<ERROR::>/) > -1) {
					stdOut = stdOut.replace(/<:LF:>/g, '\\n')
						.replace(/\s/g, '\\s');
					return defer.resolve(stdOut);
				} else {
					let output = stdOut.split(/\n/g);
					for (let i = output.length - 1; i >= 0; i--) if (output[i] === '') output.splice(i, 1);
					let newArr = objectifer(output);
					newArr = nester(newArr);
					return defer.resolve(newArr);
				}
				
			}
			
		}
	);
	
	return defer.promise
}



module.exports = {
	testKata: (req, res, next) => {
		let body = req.body;
		
		db.read.kata_for_test([req.params.kataid], (err, kataArray) => {
			if (err) console.log(err);
			let test = kataArray[0].test_script[0].test;
			
			testRunner(body.script, test).then((response) => {
				res.json(response);
//				console.log(util.inspect(response, false, null));
			});
		});
	},
	
	testExamplesKata: (req, res, next) => {
		let body = req.body;
		
		testRunner(body.script, body.examples).then((response) => {
			res.json(response);
//			console.log(util.inspect(response, false, null));
		});
	}
};





	