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
		return 0
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
			
		} else if (ele.search(/<ERROR::>/) > -1) {
			return {
				type: 'ERROR',
				value: ele.replace(/<ERROR::>/, '')
			}
		} else if (ele.search(/<COMPLETEDIN::>/) > -1) {
			return {type: 'completed', time: timeParser(ele)}
		}
	});
}



function nester(arr) {
	let count = 0;
	let testCount = 0;
	let passCount = 0;
	console.log(arr.length);
	for (let i = arr.length - 1; i >= 0; i--) {
		if(arr[i]) {
			if (arr[i].type == 'test') {
				testCount += 1;
				if (arr[i].passed == true) passCount += 1
			}
			if (arr[i].type === 'describe' || arr[i].type === 'it') {
				count += 1;
				let j = i + 1;
				let recurs = true;
				while (recurs) {
					if (arr[j].type !== 'completed') {
						if (arr[j].type == 'it') count += 1;
						arr[i].nest.push(arr.splice(j, 1)[0])
					} else {
						count -= 1;
						arr.splice(j, 1);
						recurs = false
					}
				}
			}
		} else {
			
			console.log('didn\'t have type');
			console.log(arr[i]);
		}
		
	}
	return {
		nest: arr,
		testCount: testCount,
		passCount: passCount
	}
}



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
				let newArr = objectifer(output);
				newArr = nester(newArr);
				defer.resolve(newArr);
				return
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
				console.log(util.inspect(response, false, null));
				return
			});
		});
	},
	
	testExamplesKata: (req, res, next) => {
		let body = req.body;
		console.log(body.script);
		
		testRunner(body.script, body.examples).then((response) => {
			res.json(response);
			console.log(util.inspect(response, false, null));
			return
		});
	}
};





	