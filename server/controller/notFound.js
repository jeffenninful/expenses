var express = require('express');

module.exports = function () {
    var router = express.Router();

    router.route('/')
        .get(notFound)
        .post(notFound)
        .put(notFound)
        .patch(notFound)
        .delete(notFound);

    function notFound(req, res) {
        res.json({
            error: 'INVALID_ROUTE',
            message: 'Route is invalid'
        });
    }

    return router;
};
