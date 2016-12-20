/**
 * Created by Joshua Baert on 12/16/2016.
 */

const massive = require('massive');

const config =  require('./config');
	
let db = massive.connect({
	connectionString: config.connectionString
}, (err, db) => {
	db.start.tables([], function (err, dbRes) {
		if (err) {
			console.log(err)
		} else {
			db.start.katas([], (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Reset the database.');
					process.exit();
				}
			})
			
		}
	})
	
});