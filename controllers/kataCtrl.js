const app = require('../server.js');
const db = app.get('db');

module.exports = {
    getUser: (req, res, next) => {
	    return res.status(200).json(req.user);
    },

    getKatasByKataId: (req, res, next) => {
        db.read.kata_by_id([req.params.kataid], (err, kata) => {
            if (err) return next(err);
            return res.status(200).json(kata[0]);
        })
    },

    getRandomKata: (req, res, next) => {
        var kataLevel = req.params.userkyu;
        var bottomRange = kataLevel - 1;
        var topRange = kataLevel + 1;
        db.read.random_kata([bottomRange, topRange], (err, katas) => {
            if (err) return next(err);
            return res.status(200).json(katas[Math.floor(Math.random() * katas.length)]);
        })
    },

    getRandomKataList: (req, res, next) => {
        var kataLevel = req.params.userkyu;
        var bottomRange = kataLevel - 1;
        var topRange = kataLevel + 1;
        db.read.random_kata([bottomRange, topRange], (err, katas) => {
            if (err) return next(err);
            return res.status(200).json(katas);
        })
    },

    getKatasByKyu: (req, res, next) => {
        db.read.katas_by_kyu([req.params.kyu], (err, katas) => {
            if (err) return next(err);
            return res.status(200).json(katas);
        })
    },

    getKataSolutions: (req, res, next) => {
        db.read.kata_solutions([req.params.kataid], (err, solutions) => {
           if (err) return next(err);
            return res.status(200).json(solutions);
        })
    },

    getUserKatas: (req, res, next) => {
        db.read.user_katas([req.params.userid], (err, katas) => {
            if (err) return next(err);
            return res.status(200).json(katas);
        })
    },

    searchByKatasName: (req, res, next) => {
        db.read.by_kata_name([req.body.userInput], (err, katas) => {
            if (err) return next(err);
            return res.status(200).json(katas);
        })
    },

    sumbitAnswer: (req, res, next) => {
        db.create.solution([req.body.userid, req.params.kataid, req.body.script], (err, solution) => {
            if (err) return next(err);
            return res.status(201).json(solution);
        })
    },

    voteKata: (req, res, next) => {
        db.create.kata_likes([req.body.userid, req.body.kataid, req.body.vote], (err, rating) => {
            if (err) return next(err);
            db.read.get_kata_likes([req.body.kataid], (err, likes) => {
                if (err) return next(err);
                db.read.get_kata_dislikes([req.body.kataid], (err, dislikes) => {
                    if (err) return next(err);
                    db.read.get_kata_votes([req.body.kataid], (err, votes) => {
                        if (err) return next(err);
                        return res.status(200).json({likes: likes[0].likes, dislikes: dislikes[0].dislikes, votes: votes[0].votes});
                    })
                })
            })
        })
    },

    voteSolution: (req, res, next) => {
        db.create.solution_likes([req.body.userid, req.body.solutionid, req.body.vote], (err, rating) => {
            if (err) return next(err);
            db.read.get_solution_likes([req.body.solutionid], (err, likes) => {
                if (err) return next(err);
                db.read.get_solution_dislikes([req.body.solutionid], (err, dislikes) => {
                    if (err) return next(err);
                    db.read.get_solution_votes([req.body.solutionid], (err, votes) => {
                        if (err) return next(err);
                        return res.status(200).json({likes: likes[0], dislikes: dislikes[0], votes: votes[0]});
                    })
                }) 
            })
        })
    },

    addPointsToUser: (req, res, next) => {
        db.update.user_points([req.body.points, req.body.id], (err, user) => {
            if (err) return next(err);
            return res.status(200).json(user);
        })
    }

}
