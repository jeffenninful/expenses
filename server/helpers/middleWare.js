var express = require('express');
var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    var token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token) {
        console.log('has token ');

        jwt.verify(token, 'my-super-secret', function (err, decoded) {
            if (err) {
                console.log('bad token');

                return res.status(401)
                    .json({
                        error: {
                            code: 'INVALID_TOKEN',
                            message: 'Access token verification failure'
                        }
                    });
            } else {
                console.log('token is good');
                req.decoded = decoded;
                next()
            }
        })
    } else {
        console.log('no token ');

        return res.status(401)
            .send({
                error: {
                    code: 'INVALID_TOKEN',
                    message: 'No access token provided'
                }
            });
    }
};

