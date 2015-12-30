module.exports = function () {

    var express = require('express');
    var mongoose = require('mongoose');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser');
    var morgan = require('morgan');
    var favicon = require('static-favicon');
    var app = express();

    app.use(favicon());
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.set('supersecret', 'my-super-secret');

    mongoose.connect('mongodb://localhost/expenses');
    mongoose.connection.on('error', function () {
        throw 'Database connection error';
    });

    var userCtrl = require('./controller/user')(app);
    var expenseCtrl = require('./controller/expense')(app);
    var categoryCtrl = require('./controller/category')(app);
    var authorizeCtrl = require('./controller/authorize')(app);
    var logoutCtrl = require('./controller/logout')(app);
    var registerCtrl = require('./controller/register')(app);
    var departmentCtrl = require('./controller/department')(app);
    var projectCtrl = require('./controller/project')(app);
    var notFoundCtrl = require('./controller/notFound')();
    var reviewExpenseCtrl = require('./controller/reviewExpense')();

    app.get('/', function (req, res) {
        res.redirect('/v1');
    });
    app.get('/v1', function (req, res) {
        res.send('Version 1.0 of Expenses API');
    });

    app.use('/v1/authorize', authorizeCtrl);
    app.use('/v1/category', categoryCtrl);
    app.use('/v1/department', departmentCtrl);

    app.use('/v1/expense', expenseCtrl);
    app.use('/v1/logout', logoutCtrl);
    app.use('/v1/project', projectCtrl);

    app.use('/v1/review', reviewExpenseCtrl);
    app.use('/v1/register', registerCtrl);
    app.use('/v1/user', userCtrl);
    app.use('*', notFoundCtrl);

    app.listen(9000, function(){
        console.log('Server is running on port 9000');
    });
};
