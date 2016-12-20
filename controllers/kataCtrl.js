const app = require('../server.js');
const db = app.get('db');

module.exports = {
    getKata: (req, res, next) => {
        if (!req.params.kataId) {
            db.read.get_kata([], (err, kata) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                return res.status(200).json(kata);
            }) 
        } else {
            db.read.kata_by_id([req.params.kataId], (err, kata) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                return res.status(200).json(kata[0]);
            })
        }   
    },

    getRandomKata: (req, res, next) => {
        if (!req.params.kyu) {
            db.read.get_random_kata([], (err, katas) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                // math floor for random 
                return res.status(200).json(katas);
            })
        } else {
            db.read.get_random_by_kyu([req.params.kyu], (err, katas) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } 
                // get random kata based on kyu choice
                return res.status(200).json(katas);
            })
        }
    },

    getCompletedKatas: (req, res, next) => {
        db.read.get_completed_katas([req.params.userId], (err, katas) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            // get kata info based on if they have been completed by that user
            return res.status(200).json(katas);
        })
    },

    getKataSolutions: (req, res, next) => {
        db.read.get_kata_solutions([req.params.kataId], (err, solutions) => {
           if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            return res.status(200).json(solutions);
        })
    },

    postSolution: (req, res, next) => {
        db.create.post_solution([req.body.script, req.params.kataId], (err, solution) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);   
            }
             return res.status(201).json(solution);
        })
    },

}