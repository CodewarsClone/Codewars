/**
 * Created by Joshua Baert on 12/15/2016.
 *
 * This Controller is where we take take a script as a string then run our tests against it
 *
 */

const exec = require('child_process').exec;

// let script = `let addTwo = (x) => {return x+2};`;
let test = `Test.assertEquals(addTwo(2), 4)`;


// This is where wer run a script.. I have verified that so long as we get it in string format we run unit tests
// exec(`docker run --rm codewars/node-runner run -l javascript -c "${script}" -t cw -f "${test}"`,
// 	(err, stdout, stderr) => {
// 		if (err) console.log('err', err);
// 		console.log(typeof stdout);
// 		console.log('stdout', stdout);
// 		console.log('stderr', stderr);
// 	});

module.exports = {
	firstTest: (script) => {
		exec(`docker run --rm codewars/node-runner run -l javascript -c "${script}" -t cw -f "${test}"`,
	(err, stdout, stderr) => {
		if (err) console.log('err', err);
		console.log(typeof stdout);
		console.log('stdout', stdout);
		console.log('stderr', stderr);
	});
	} 
}
