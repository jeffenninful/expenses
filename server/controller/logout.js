var express = require('express');
var verifyToken = require('./../helpers/verifyToken');

module.exports = function (app) {
    var Session = require('../model/session');
    var router = express.Router();

    router.use(verifyToken);

    router.route('/')
        .post(endSession);

    function endSession(req, res) {
        console.log('decoded reg', req.decoded);

        //decode token and retrieve user id
        Session.findOne({_id: req.decoded._id},
            function (err, foundSession) {
                if (err) {
                    console.log('No session found');
                } else {
                    //foundSession.token.indexOf();
                    res.status(200);
                    res.json({data: {success: true}});
                }
            });
    }

    return router;
};
