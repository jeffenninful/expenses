var express = require('express');

module.exports = function (app) {
    var router = express.Router();
    var authorization = require('./../helpers/middleWare');
    var Category = require('../model/category');

    router.use(authorization);

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
        Category.find(function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function postOne(req, res) {
        var kind = new Category(req.body);
        kind.save();
        res.status(201).send(kind);
    }

    function oneMiddleWare(req, res, next) {
        Category.findById(req.params.id, function (err, kind) {
            if (err) {
                res.status(500).send(err);
            } else if (kind) {
                req.kind = kind;
                next();
            } else {
                res.status(400).send('category not found');
            }
        });
    }

    function getOne(req, res) {
        res.json(req.kind);
    }

    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.kind[prop] = req.body[prop];
        }
        req.kind.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.kind);
            }
        });
    }

    function removeOne(req, res) {
        req.kind.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('category removed');
            }
        });
    }

    return router;
};
