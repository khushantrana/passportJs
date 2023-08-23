const LocalStrategy = require('passport-local').Strategy;
import { User } from './database.js';
exports.intializingPassport = async(passport) => {
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                return done(null, false);
            }
            if (user.password !== password) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(null, user);
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch {
            done(error, false);
        }
    }));
}