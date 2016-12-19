const app = require('../server');
const db = app.get('db');

module.exports = {
    getKata: (req, res, next) => {
        db.get_kata([], (err, user) => {

        })
        db.read.kata_by_id([], (err, user) => {

        })
    },

	postSolution: (req, res, next) => {
        db.post_solution([], (err, user) => {
            
        })
    },

    getRandomKata: (req, res, next) => {
        db.get_random_kata([], (err, user) => {
            
        })
        db.get_random_by_kyu([], (err, user) => {
            
        })
    },

    getCompletedKatas: (req, res, next) => {
        db.get_completed_katas([], (err, user) => {
            
        })
    },

    getKataSolutions: (req, res, next) => {
        db.get_kata_solutions([], (err, user) => {
            
        })
    },

    

}