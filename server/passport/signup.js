var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('../model/user');

module.exports = function (passport) {

  passport.use('signup', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {
      console.log('creating account', username , password);

      findOrCreateUser = function () {
        //find a user in Mongo with provided username
        User.findOne({'username': username}, function (err, user) {
          if (err) {
            console.log('Error in signup ', err);
            done(err);
          }
          //user already exist
          if (user) {
            console.log('User already exist');
            return done(null, false, req.flash('message', 'User already exist.'))
          } else {
            //no such user hence create user
            var newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.param('email');

            //save user
            console.log('saving', newUser);
            newUser.save(function (err) {
              if (err) {
                console.log('Error saving user');
                throw err;
              }
              console.log('User registration successful');
              return done(null, newUser);
            });
          }
        });
      };

      // Delay the execution of findOrCreateUser and execute
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    }));

  //hash password
  function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

};
