/**
 * Created by Joshua Baert on 12/15/2016.
 */

const exec = require('child_process').exec;

exec('docker run --rm codewars/node-runner run -l javascript -c "var a = 1;" -t cw -f "Test.assertEquals(a, 1)"', (err, stdout, stderr)=> {
	if (err) console.log('err', err);
	console.log(typeof stdout);
	console.log('stdout', stdout);
	console.log('stderr', stderr);
});