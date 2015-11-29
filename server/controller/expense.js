var express = require('express');
var fs = require('fs');
var busboy = require('connect-busboy');

module.exports = function (app) {
    app.use(busboy());
    var router = express.Router();
    var verifyToken = require('./../helpers/verifyToken');
    var Expense = require('../model/expense');

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
        Expense.find(function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function postOne(req, res) {
        //req.pipe(req.busboy);

        //req.busboy.on('file', function (fieldname, file, filename) {
        //req.body.receipt = {
        //    'data': file,
        //    'contentType': 'image/png',
        //    'fileName' : filename
        //};
        //
        //console.log(' req body', req.body);
        //});

        var expense = new Expense(req.body);
        expense.save();
        res.status(201).send(expense);
    }

    function oneMiddleWare(req, res, next) {
        Expense.findById(req.params.id, function (err, expense) {
            if (err) {
                res.status(500).send(err);
            } else if (expense) {
                req.expense = expense;
                next();
            } else {
                res.status(400).send('Expense not found');
            }
        });
    }

    function getOne(req, res) {
        res.json(req.expense);
    }

    function putOne(req, res) {
        req.expense.date = req.body.date;
        req.expense.category = req.body.category;
        req.expense.description = req.body.description;
        req.expense.amount = req.body.amount;
        req.expense.receipt = req.body.receipt;
        req.expense.billable = req.body.billable;
        req.expense.projectCode = req.body.projectCode;

        req.expense.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.expense);
            }
        })

    }

    function patchOne(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        for (var prop in req.body) {
            req.expense[prop] = req.body[prop];
        }
        req.expense.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.expense);
            }
        });
    }

    function removeOne(req, res) {
        req.expense.remove(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('expense removed');
            }
        });
    }

    return router;
};
