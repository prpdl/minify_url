import PassportJWT from 'passport-jwt'
import mongoose from 'mongoose'
import User from '../model/user'
import keys from '../config/keys'
import passport from 'passport'
const JWTStrategy = PassportJWT.Strategy
const ExtractJWT = PassportJWT.ExtractJwt

const opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secret = keys.secret

export default passport => {
    passport.use(
        new JWTStrategy(opts, (jwt_paylod, done) => {
            User.findById(jwt_paylod.id)
                .then(user => {
                    if(user) return done(null, user);
                    return done(null, false);
                })
                .catch(err=> console.log(err))
        })
    )
}