var express = require('express');

module.exports = function (app) {
    var Session = require('../model/session');
    var router = express.Router();

    router.route('/')
        .post(endSession);

    function endSession(req, res) {
        Session.findOne({token: req.headers['x-access-token']},
            function (err, data) {
                if (err) {
                    console.log('No session found');
                } else {
                    Session.remove(data, function (err) {
                        if (err) {
                            console.log('Error removing session', err);
                        }
                    });
                    res.status(200);
                    res.json({data: {success: true}});
                }
            });
    }
    return router;
};
