/**
 * Created by Joshua Baert on 12/21/2016.
 */

const massive = require('massive');

const config =  require('./config');

let db = massive.connect({
	connectionString: config.connectionString
}, (err, db) => {
	db.start.kataTest([], function (err, dbRes) {
		if (err) {
			console.log(err)
		} else {
			console.log('Kata can (and was) inserted!!');
			process.exit();
		}
	});
	
});