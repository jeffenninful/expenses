var express = require('express');
var jwt = require('jsonwebtoken');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (app) {
    var User = require('../model/user');
    var Session = require('../model/session');
    var router = express.Router();

    router.route('/')
        .post(register);

    function register(req, res) {
        if (!req.body.email) {
            res.status(404);
            res.json({
                code: 'MISSING_VALUE',
                field: 'email'
            });
            return;
        }
        if (!req.body.password) {
            res.status(404);
            res.json({
                code: 'MISSING_VALUE',
                field: 'password'
            });
            return;
        }
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500);
                res.json({
                    code: 'SERVICE_ERROR',
                    field: null
                });
            }
            if (user) {
                res.status(404);
                res.json({
                    error: {
                        code: 'USER_EXIST',
                        field: 'email'
                    }
                });
            } else {
                //no such user hence create user
                var newUser = new User(req.body);
                newUser.password = createHash(req.body.password);
                newUser.dateJoined = new Date();
                newUser.save(function (err, user) {
                    if (err) {
                        res.status(500);
                        res.json({
                            code: 'SERVICE_ERROR',
                            field: null
                        });
                    } else {
                        var token = jwt.sign(user, app.get('supersecret'), function () {
                            expiresInMinutes: 60
                        });
                        var session = new Session();
                        session._id = user._id;
                        session.token = token;
                        session.expiration = 180;

                        session.save(function (err) {
                            if (err) {
                                console.log('err', err);
                            }
                        });
                        var modifiedUser = JSON.parse(JSON.stringify(user));
                        delete modifiedUser.password;
                        res.status(200);
                        res.json({
                            profile: modifiedUser,
                            token: token
                        });
                    }
                });
            }
        }); // find existing user callback

    }

    function createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

    return router;
};
