var express = require('express');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
    var router = express.Router();
    var verifyToken = require('./../helpers/verifyToken');
    var Project = require('../model/project');

    router.use(verifyToken);

    router.use('/:id', oneMiddleWare);
    router.route('/')
        .get(getAll)
        .post(postOne);

    router.route('/:id')
        .get(getOne)
        .put(putOne)
        .patch(patchOne)
        .delete(removeOne);


    function getAll(req, res) {
        Project.find(function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function postOne(req, res) {
        var work = new Project(req.body);
        work.save();
        res.status(201).send(work);
    }

    function oneMiddleWare(req, res, next) {
        Project.findById(req.params.id, function (err, work) {
            if (err) {
                res.status(500).send(err);
            } else if (work) {
                req.work = work;
                next();
            } else {
                res.status(400).send('project not found');
            }
        });
    }

    function getOne(req, res) {
        res.json(req.work);
    }

    function putOne(req, res) {
        req.work.firstName = req.body.firstName;
        req.work.middleName = req.body.middleName;
        req.work.lastName = req.body.lastName;
        req.work.dob = req.body.dob;
        req.work.active = req.body.active;

        req.work.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.work);
            }
        })

    }

    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.work[prop] = req.body[prop];
        }
        req.work.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.work);
            }
        });
    }

    function removeOne(req, res) {
        req.work.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('project removed');
            }
        });
    }

    return router;
};
