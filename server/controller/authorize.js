var express = require('express');
var jwt = require('jsonwebtoken');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (app) {
    var User = require('../model/user');
    var Session = require('../model/session');
    var router = express.Router();

    router.route('/')
        .post(authorize);

    function authorize(req, res) {
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
        User.findOne({email: req.body.email}, {password: 0, __v :0},
            function (err, user) {
                if (err) {
                    res.status(500);
                    res.json({
                        code: 'SERVICE_ERROR',
                        field: null
                    });
                }

                if (!user) {
                    res.status(404);
                    res.json({
                        error: {
                            code: 'USER_NOT_FOUND',
                            message: 'No user found.'
                        }
                    });
                } else {
                    if (!isValidPassword(req.body.password, user)) {
                        res.status(404);
                        res.json({
                            error: {
                                code: 'INVALID_CREDENTIALS',
                                message: 'Authentication failed. wrong password'
                            }
                        });
                    } else if (!user.active) {
                        res.status(400)
                            .json({
                                error: {
                                    code: 'INACTIVE_USER',
                                    message: 'User is no longer active.'
                                }
                            });
                    } else {

                        var token = jwt.sign(user, app.get('supersecret'), function () {
                            expiresInMinutes: 2
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

                        res.status(200);
                        res.json({
                            profile: user,
                            token: token
                        });
                    }
                }
            });
    }

    function isValidPassword(password, user) {
        return bCrypt.compareSync(password, user.password);
    }

    return router;
};
