var express = require('express');
var multer = require('multer');
var path = require('path');

module.exports = function (app) {

    var router = express.Router();
    var verifyToken = require('./../helpers/verifyToken');
    var Expense = require('../model/expense');
    var upload = multer({'dest': path.join(__dirname, '../uploads/')});

    router.use(verifyToken);
    router.use('/:id', oneMiddleWare);

    router.route('/')
        .get(getAll)
        .post(upload.array('file'), postOne);

    router.route('/approved')
        .get(getApproved);

    router.route('/denied')
        .get(getDenied);

    router.route('/pending')
        .get(getPending);

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
        console.log('req body', req.body);
        console.log('req files', req.files);

        //req.files.forEach(function(item){
        //    req.body.receipt.push(item.filename);
        //});

        var expense = new Expense(req.body);
        expense.save();
        res.status(201).send(expense);
    }

    function oneMiddleWare(req, res, next) {
        console.log('inside middleware',req.params.id);

        Expense.find({userId: req.params.id}, function (err, expense) {
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

    function getApproved(req, res) {
        Expense.find({status: 'approved'}, function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function getDenied(req, res) {
        Expense.find({status: 'denied'}, function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    function getPending(req, res) {
        console.log('inside pending');

        Expense.find({status: 'pending'}, function (err, list) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(list);
            }
        });
    }

    return router;
};
