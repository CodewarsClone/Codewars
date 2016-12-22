const app = require('../server.js');
const db = app.get('db');

module.exports = {
    getUser: (req, res, next) => {
	    return res.status(200).json(req.user);
    },

    getKatasByKataId: (req, res, next) => {
        console.log('get katas ran');
            db.read.kata_by_id([req.params.kataId], (err, kata) => {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                return res.status(200).json(kata[0]);
            })
    },
    
    getRandomKata: (req, res, next) => {
        db.read.random_kata((err, katas) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            return res.status(200).json(katas[Math.floor(Math.random() * katas.length + 1)]);
        })
    },

    getRandomKataList: (req, res, next) => {
        db.read.random_kata((err, katas) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            return res.status(200).json(katas);
        })
    },

    getKatasByKyu: (req, res, next) => {
        db.read.katas_by_kyu([req.params.kyu], (err, katas) => {
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

    getUserKatas: (req, res, next) => {
        db.read.user_katas([req.user.id], (err, katas) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            return res.status(200).json(katas);
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

    searchByKatasName: (req, res, next) => {
        db.read.by_kata_name([req.body.userInput], (err, katas) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            return res.status(200).json(katas);
        })
    },

}