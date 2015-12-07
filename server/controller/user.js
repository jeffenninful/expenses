var express = require('express');

module.exports = function (app) {
    var router = express.Router();
    var verifyToken = require('./../helpers/verifyToken');
    var User = require('../model/user');

    router.use(verifyToken);
    router.use('/:id', oneMiddleWare);

    router.route('/')
        .get(getAll)
        .post(postOne);

    router.route('/:id')
        .get(getOne)
        .put(patchOne)
        .patch(patchOne)
        .delete(removeOne);

    function getAll(req, res) {
        if (req.decoded.role === 'admin') {
            User.find(function (err, list) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(list);
                }
            });
        } else {
            res.json({
                error: 'UNAUTHORIZED_USER',
                message: 'Admin priviledges required'
            });

        }
    }

    function postOne(req, res) {
        var user = new User(req.body);
        user.save();
        res.status(201);
        res.json({
            profile: req.user,
            token: req.headers['x-access-token']
        });
    }

    function oneMiddleWare(req, res, next) {
        if (req.params.id) {
            User.findById(req.params.id, {password: 0, __v: 0}, function (err, user) {
                if (err) {
                    res.status(500);
                    res.json({
                        error: 'SERVICE_ERROR',
                        message: 'Error finding user'
                    });
                } else if (user) {
                    req.user = user;
                    next();
                } else {
                    res.status(400);
                    res.json({
                        error: 'NOT_FOUND',
                        message: 'User not found'
                    });
                }
            });
        } else {
            res.status(400);
            res.json({
                code: 'SERVICE_ERROR',
                message: 'User id not provided'
            });
        }
    }

    function getOne(req, res) {
        res.json({
            profile: req.user
        });
    }


    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.user[prop] = req.body[prop];
        }
        req.user.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json({
                    profile: req.user,
                    token: req.headers['x-access-token']
                });
            }
        });
    }

    function removeOne(req, res) {
        req.user.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('user removed');
            }
        });
    }

    return router;
}
;
