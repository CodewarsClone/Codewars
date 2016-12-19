const app = require('../server.js');
const db = app.get('db');

module.exports = {
    getKata: (req, res, next) => {
        if (dsf) {
            db.read.get_kata([], (err, kata) => {

            }) 
            
        } else {
            db.read.kata_by_id([], (err, kata) => {

            })
        }   
    },

	postSolution: (req, res, next) => {
        db.create.post_solution([], (err, user) => {
            
        })
    },

    getRandomKata: (req, res, next) => {
        if (dsf) {
            db.read.get_random_kata([], (err, kata) => {

            })
        } else {
            db.read.get_random_by_kyu([], (err, kata) => {
                
            })
        }
    },

    getCompletedKatas: (req, res, next) => {
        db.read.get_completed_katas([], (err, user) => {
            
        })
    },

    getKataSolutions: (req, res, next) => {
        db.read.get_kata_solutions([], (err, user) => {
            
        })
    },

    

}