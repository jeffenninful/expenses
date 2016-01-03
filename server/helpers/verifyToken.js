var express = require('express');
var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    var token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if (token) {
        jwt.verify(token, 'my-super-secret', function (err, decoded) {

            if (err) {
                return res.status(401)
                    .json({
                        error: {
                            code: 'INVALID_TOKEN',
                            message: 'Access token verification failure'
                        }
                    });
            } else {
                req.decoded = decoded;
                next()
            }
        })
    } else {
        return res.status(401)
            .send({
                error: {
                    code: 'INVALID_TOKEN',
                    message: 'No access token provided'
                }
            });
    }
};

