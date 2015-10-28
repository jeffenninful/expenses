var login = require('./login');
var signup = require('./signup');
var User = require('../model/user');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    console.log('Serializing a user: ', user);
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log('Deserializing a user: ', user);
      done(err, user);
    });
  });

  //initialize passport strategies
  login(passport);
  signup(passport);
};
