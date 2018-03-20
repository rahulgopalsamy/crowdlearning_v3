'use strict';

const LocalStrategy = require('passport-local').Strategy,
      User = require('../models/user.js');


module.exports = function(passport){

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback : true
    },
        function(req, email, password, done){
            User.findOne({email:email}).exec(function(err,user){
                if(err) {return done(err);};
                if(!user){
                    return done(null, false, {message: "Username does not exist"});
                }
                if (!user.validPassword(password)){
                    return done(null, false, {message: "Wrong Password. Try again!"});
                }
                return done(null, user);
            })
        }
    ));


    passport.use('local', new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback : true
    },
        function(req, email, password, done){
            User.findOne({email:email}).exec(function(err, user){
                if(user){
                    return done(null, false, {message : "User already exist"});
                }
                else {
                    let newuser = new User (req.body);
                    newuser.password = newuser.generateHash(password);
                    newuser.save().then(function(myuser){
                        return done(null, myuser);
                    }). catch(function(err){
                        return done(err);
                    });
                }
            })
        }
    ));

};
