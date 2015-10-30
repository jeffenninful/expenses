module.exports = function () {

    var express = require('express');
    var fs = require('fs');
    var path = require('path');
    var favicon = require('static-favicon');
    var morgan = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/expenses');
    mongoose.connection.on('error', function () {
        console.log('Connection error');
    });

    var app = express();

    app.use(favicon());
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.set('supersecret', 'my-super-secret');

    var userController = require('./controller/user')(app);
    var expenseController = require('./controller/expense')();
    var categoryController = require('./controller/category')();
    var authorizeController = require('./controller/authorize')(app);
    var registerController = require('./controller/register')(app);

    app.get('/v1', function (req, res) {
        res.send('Version 1.0 of Expenses API');
    });

    app.use('/v1/authorize', authorizeController);
    app.use('/v1/category', categoryController);
    app.use('/v1/expense', expenseController);
    app.use('/v1/register', registerController);
    app.use('/v1/user', userController);


    app.listen(9000);
    console.log('server started on port 9000');

};
