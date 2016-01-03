var express = require('express');
var jwt = require('jsonwebtoken');
var bCrypt = require('bcrypt-nodejs');
var parser = require('ua-parser-js');

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
        User.findOne({email: req.body.email},
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
                            expiresIn: 120
                        });

                        Session.findOne({_id: user._id}, function (err, foundSession) {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            if (foundSession) {
                                //add to existing sessions
                                foundSession.token.push({
                                    id: token,
                                    ipAddress: req.connection.remoteAddress,
                                    startDate: new Date(),
                                    userAgent: parser(req.headers['user-agent'])
                                });

                                foundSession.save(function (err) {
                                    if (err) {
                                        console.log('err', err);
                                        throw err;
                                    }
                                });

                            } else {
                                //start new session for user
                                var session = new Session();
                                session._id = user._id;
                                session.token.push({
                                    id: token,
                                    ipAddress: req.connection.remoteAddress,
                                    startDate: new Date(),
                                    userAgent: parser(req.headers['user-agent'])
                                });

                                session.save(function (err) {
                                    if (err) {
                                        console.log('err', err);
                                        throw err;
                                    }
                                });
                            }
                        });

                        var modifiedUser = user;
                        delete modifiedUser.password;

                        res.status(200);
                        res.json({
                            profile: modifiedUser,
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
