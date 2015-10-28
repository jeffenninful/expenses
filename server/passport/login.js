var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('../model/user');

module.exports = function (passport) {

  passport.use('login', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {
      //check in mongo if a user with email exists or not
      User.findOne({'username': username}, function (err, user) {
        //incase of error
        if (err) {
          done(err);
        }
        //user not found
        if (!user) {
          console.log('User not found with username' + username);
          return done(null, false, req.flash('message', 'User not found.'));
        }
        //user exist but incorrect password
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(null, false, req.flash('message', 'Invalid Password.'));
        }
        //username matches password
        return done(null, user);
      });
    }
  ));

  function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
  }

};
