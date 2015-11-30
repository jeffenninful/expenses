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

    var userController = require('./controller/user')(app);
    var expenseController = require('./controller/expense')(app);
    var categoryController = require('./controller/category')(app);
    var authorizeController = require('./controller/authorize')(app);
    var logoutController = require('./controller/logout')(app);
    var registerController = require('./controller/register')(app);
    var departmentController = require('./controller/department')(app);
    var projectController = require('./controller/project')(app);
    var notFoundController = require('./controller/notFound')();

    app.get('/', function (req, res) {
        res.redirect('/v1');
    });
    app.get('/v1', function (req, res) {
        res.send('Version 1.0 of Expenses API');
    });

    app.use('/v1/authorize', authorizeController);
    app.use('/v1/category', categoryController);
    app.use('/v1/department', departmentController);

    app.use('/v1/expense', expenseController);
    app.use('/v1/logout', logoutController);
    app.use('/v1/project', projectController);

    app.use('/v1/register', registerController);
    app.use('/v1/user', userController);
    app.use('*', notFoundController);

    app.listen(9000, function(){
        console.log('Server is running on port 9000');
    });
};
