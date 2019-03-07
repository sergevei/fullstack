const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const key = require('../config/key');

const options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key.secretKey;

module.exports = passport => {
    passport.use(
        new jwtStrategy( options , (jwt_payload , done)=>{
            console.log(jwt_payload);
            User.findById(jwt_payload.id)
            .then( user => {
                if(user){
                    return done( null, user);
                }
                return done( null, false );
            })
            .catch( err => console.log(err));
        })
    );
};