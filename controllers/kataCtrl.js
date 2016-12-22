const app = require('../server.js');
const db = app.get('db');

module.exports = {
    getKatas: (req, res, next) => {
        if (!req.params.kataId) {
            db.read.katas((err, kata) => {
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
        console.log(1);
        if (!req.params.kyu) {
            console.log(2);
            db.read.katas((err, katas) => {
                console.log(3);
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                console.log(4);
                return res.status(200).json(katas[Math.floor(Math.random() * katas.length + 1)]);
            })
        } else {
            console.log(2.1);
            db.read.random_by_kyu([req.params.kyu], (err, katas) => {
                console.log(3.1);
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                } 
                return res.status(200).json(katas[Math.floor(Math.random() * katas.length + 1)]);
            })
        }
    },

    getCompletedKatas: (req, res, next) => {
        db.read.completed_katas([req.user.id], (err, katas) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            return res.status(200).json(katas);
        })
    },

    getKataSolutions: (req, res, next) => {
        db.read.kata_solutions([req.params.kataId], (err, solutions) => {
           if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            return res.status(200).json(solutions);
        })
    },

    postSolution: (req, res, next) => {
        db.create.solution([req.user.id, req.params.kataId, req.body.script], (err, solution) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);   
            }
             return res.status(201).json(solution);
        })
    },

}