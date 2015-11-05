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
        console.log('DB connection error');
    });

    var app = express();

    app.use(favicon());
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.set('supersecret', 'my-super-secret');

    var userController = require('./controller/user')(app);
    var expenseController = require('./controller/expense')(app);
    var categoryController = require('./controller/category')(app);
    var authorizeController = require('./controller/authorize')(app);
    var logoutController = require('./controller/logout')(app);
    var registerController = require('./controller/register')(app);
    var departmentController = require('./controller/department')(app);
    var projectController = require('./controller/project')(app);

    app.get('/', function (req, res) {
        res.redirect('/v1');
    });
    app.get('/v1', function (req, res) {
        res.send('Version 1.0 of Expenses API');
    });

    app.use('/v1/authorize', authorizeController);
    app.use('/v1/register', registerController);
    app.use('/v1/logout', logoutController);

    app.use('/v1/category', categoryController);
    app.use('/v1/expense', expenseController);
    app.use('/v1/project', projectController);

    app.use('/v1/user', userController);
    app.use('/v1/department', departmentController);

    app.use('*', function (req, res) {
            res.json({
                error: 'INVALID_ROUTE',
                message: 'Route not available'
            });
        }
    );

    function upload() {
        var router = express.Router();
        router.post('/', function (req, res) {
            console.log('uploading file', req.body);

            fs.readFile(req.files.displayImage.path, function (err, data) {
                // ...
                var newPath = __dirname + "/uploads/uploadedFileName";
                fs.writeFile(newPath, data, function (err) {
                    res.redirect("back");
                });
            });
        });
    }

    app.use('/v1/fileUpload', upload);

    app.listen(9000);
    console.log('server started on port 9000');

};
