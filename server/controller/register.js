var express = require('express');
var jwt = require('jsonwebtoken');
var bCrypt = require('bcrypt-nodejs');

module.exports = function (app) {
  var User = require('../model/user');
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
          var newUser = new User();
          newUser.email = req.body.email;
          newUser.password = createHash(req.body.password);
          newUser.firstName = req.body.firstName;

          //save user
          console.log('saving', newUser);
          newUser.save(function (err, user) {
            if (err) {
              res.status(500);
              res.json({
                code: 'SERVICE_ERROR',
                field: null
              });
            } else {
              var token = jwt.sign(user, app.get('supersecret'), function () {
                expiresInMinutes: 2
              });
              res.status(200);
              res.json({
                user: user,
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
