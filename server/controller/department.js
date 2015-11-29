var express = require('express');

module.exports = function (app) {
    var router = express.Router();
    var authorization = require('./../helpers/middleWare');
    var Department = require('../model/department');

    router.use(authorization);

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
        Department.find(function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function postOne(req, res) {
        var dept = new Department(req.body);
        dept.save();
        res.status(201).send(dept);
    }

    function oneMiddleWare(req, res, next) {
        Department.findById(req.params.id, function (err, dept) {
            if (err) {
                res.status(500).send(err);
            } else if (dept) {
                req.dept = dept;
                next();
            } else {
                res.status(400).send('department not found');
            }
        });
    }

    function getOne(req, res) {
        res.json(req.dept);
    }

    function putOne(req, res) {
        req.dept.code = req.body.code;
        req.dept.name = req.body.name;
        req.dept.active = req.body.active;

        req.dept.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.dept);
            }
        })

    }

    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.dept[prop] = req.body[prop];
        }
        req.dept.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.dept);
            }
        });
    }

    function removeOne(req, res) {
        req.dept.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('location removed');
            }
        });
    }

    return router;
};
