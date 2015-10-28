var express = require('express');

module.exports = function () {
  var router = express.Router();
  var User = require('../model/category');
  router.use('/:userId', oneMiddleWare);

  router.route('/')
    .get(getAll)
    .post(postOne);

  router.route('/:userId')
    .get(getOne)
    .put(putOne)
    .patch(patchOne)
    .delete(removeOne);


  function getAll(req, res) {
    User.find(function (err, list) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(list);
      }
    });
  }

  function postOne(req, res) {
    var user = new User(req.body);
    user.save();
    res.status(201).send(user);
  }

  function oneMiddleWare(req, res, next) {
    User.findById(req.params.userId, function (err, user) {
      if (err) {
        res.status(500).send(err);
      } else if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).send('user not found');
      }
    });
  }

  function getOne(req, res) {
    res.json(req.user);
  }

  function putOne(req, res) {
    req.user.firstName = req.body.firstName;
    req.user.middleName = req.body.middleName;
    req.user.lastName = req.body.lastName;
    req.user.dob = req.body.dob;
    req.user.active = req.body.active;

    req.user.save(function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(req.user);
      }
    })

  }

  function patchOne(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    for (var prop in req.body) {
      req.user[prop] = req.body[prop];
    }
    req.user.save(function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(req.user);
      }
    });
  }

  function removeOne(req, res) {
    req.user.remove(function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('user removed');
      }
    });
  }

  return router;
};
