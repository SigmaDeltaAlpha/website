let LocalStrategy   = require('passport-local').Strategy
let User            = require( __dirname + '/../models/user.js').Model

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user)
        })
    })

    passport.use('local-signup', new LocalStrategy({
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallBack   : true
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({ 'email': req.body.email}, function(err, user){
                if (err){
                    return done(err)
                }
                else if (user){
                    return done(null, false, req.flash('signupMessage', 'That email is already taken'))
                }
                else {
                    let newUser = new User()
                    newUser.email       = req.body.email // check if valid email
                    newUser.password    = newUser.generateHash(req.body.passowrd)

                    // save the user
                    newUser.save(function(err){
                        if (err){
                            return done(err)
                        }
                        return done(null, newUser)
                    })
                }
            })
        })
    }))

    passport.use('local-login', new LocalStrategy({
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallBack   : true
    },
    function(req, email, password, done){
                User.findOne({
                    'email' : req.body.email
                }, function(err, user){
                    if (err){
                        return done(err)
                    }
                    else if (!user){
                        return done(null, false, req.flash('loginMessage', 'No user found'))
                    }
                    else if (!user.validPassword(req.body.password)){
                        return done(null, false, req.flash('loginMessage', 'Incorrect Password'))
                    }
                    else {
                        return done(null, user)
                    }
                })
    }))

}
