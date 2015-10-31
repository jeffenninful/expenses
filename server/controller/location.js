var express = require('express');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
    var Location = require('../model/location');
    var router = express.Router();

    router.use(function (req, res, next) {
        var token = req.headers['x-access-token'] || req.body.token || req.query.token;

        if (token) {
            jwt.verify(token, app.get('supersecret'), function (err, decoded) {
                if (err) {
                    return res.status(401)
                        .json({
                            error: {
                                code: 'INVALID_TOKEN',
                                message: 'Access token verification failure'
                            }
                        });
                } else {
                    req.decoded = decoded;
                    next()
                }
            })
        } else {
            return res.status(401)
                .send({
                    error: {
                        code: 'INVALID_TOKEN',
                        message: 'No access token provided'
                    }
                });
        }
    });


    router.use('/:id', oneMiddleWare);

    router.route('/')
        .get(getAll)
        .post(postOne);

    router.route('/:id')
        .get(getOne)
        .put(putOne)
        .patch(patchOne)
        .delete(removeOne);

    //accessible to admin. Check for special token before querying
    function getAll(req, res) {
        Location.find(function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function postOne(req, res) {
        var local = new Location(req.body);
        local.save();
        res.status(201).send(local);
    }

    function oneMiddleWare(req, res, next) {
        //if (req.params.id !== '123') {
            Location.findById(req.params.id, function (err, local) {
                if (err) {
                    res.status(500).send(err);
                } else if (local) {
                    req.local = local;
                    next();
                } else {
                    res.status(400).send('local not found');
                }
            });
        //} else {
        //    res.status(400);
        //    res.json({
        //        code: 'SERVICE_ERROR',
        //        message: 'Location id not provided'
        //    });
        //}
    }

    function getOne(req, res) {
        res.json(req.local);
    }

    function putOne(req, res) {
        req.local.code = req.body.code;
        req.local.name = req.body.name;
        req.local.active = req.body.active;

        req.local.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.local);
            }
        })

    }

    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.local[prop] = req.body[prop];
        }
        req.local.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.local);
            }
        });
    }

    function removeOne(req, res) {
        req.local.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('location removed');
            }
        });
    }

    return router;
};
